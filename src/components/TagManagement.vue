<template>
  <div style="margin: 0 auto; width: 70%;">
      
    <div class="container mt-5">
      <div class="card">
        <div class="card-header">
          <h4>Listado de Etiquetas</h4>
        </div>
        <div class="card-body">
          <div
            v-for= "(tag, index) in tempTags"
            :key="tag.tag_id"
            class="d-flex align-items-center mb-2"
          >
            <input
              v-model="tag.name"
              class="form-control mr-2"
            />
            <button
              v-if="!tag.new"
              @click="deleteTag(index)"
              class="btn btn-danger"
            >
              Eliminar
            </button>
            <button
              v-if="tag.new"
              @click="deleteNewTag(index)"
              class="btn btn-danger"
            >
              Eliminar
            </button>
          </div>
          <div class="d-flex justify-content-center">
            <button @click="addNewTag" class="btn btn-success mr-2" style="background-color: #2eae85">
              Nuevo
            </button>
            <button @click="saveTags" class="btn btn-info mr-2">
              Guardar
            </button>
            <button @click="cancelEdit" class="btn btn-secondary" style="background-color: #0A0148">
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import router from '@/router/router';
import TagService from '../service/TagService.js';
import TaskService from '../service/TaskService.js'; 
import Swal from 'sweetalert2'

export default {
  name: 'TagManagement',
  data() {
    return {
      tags: [],
      tempTags: [],
      tasks: [],
      editing:false,
    };
  },
  created(){
        this.tagService = new TagService();
        this.taskService = new TaskService();
    },
    async mounted(){
        const userId = this.$store.getters['getUserId'];
        console.log("ID del usuario reconocido en tagsMa : " + userId);    
        try {
                const [tasks, tags] = await Promise.all([
                    this.taskService.getTasks(userId),
                    this.tagService.getTags(userId),
                ]);
                this.tasks = tasks.result;
                // console.log("t"+JSON.stringify(this.tasks));
                this.tags = tags.result;
                // console.log("t"+JSON.stringify(this.tags));
            } catch (error) {
                console.error(error);
            }

        this.tempTags = JSON.parse(JSON.stringify(this.tags));
        // console.log("tt"+JSON.stringify(this.tempTags));
    },
  methods: {
    addNewTag() {
      this.tempTags.push({ name: '', new: true });
    },
    deleteTag(index) {
      this.tempTags.splice(index, 1);
    },
    deleteNewTag(index) {
      this.tempTags.splice(index, 1);
    },
    async confirmDeleteTag(tag) {
    try {
      const userId = this.$store.getters['getUserId'];
      console.log("ID del usuario reconocido en tagsDelete : " + userId);
      console.log("task :"+JSON.stringify(this.tasks));
      const tasksAssignedToTag = this.tasks.filter(task => task.tags_tag_id === tag.tag_id);
      console.log("tasksAssignedToTag: " + tasksAssignedToTag+" # "+tasksAssignedToTag.length);
      if (tasksAssignedToTag.length > 0) {
        const confirmDelete2 = window.confirm(`La etiqueta "${tag.name}" está asignada a ${tasksAssignedToTag.length} tareas. ¿Estás seguro de que deseas eliminarla?`);
        const confirmDelete = await Swal.fire({
          title: `La etiqueta "${tag.name}" está asignada a ${tasksAssignedToTag.length} tareas. ¿Estás seguro de que deseas eliminarla?`,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Sí, eliminar',
          cancelButtonText: 'Cancelar'
        });
        if (confirmDelete.isConfirmed || !confirmDelete2) {
          return;
        }
      }
      for (const task of tasksAssignedToTag) {
        task.tags_tag_id = null;
        //Actualizar Tasks
        const data = await this.taskService.updateTask(task.task_id, task, userId);
        this.data = data.result;
                if(data.code !== 'TASK-000'){
                  Swal.fire({
                        icon: 'error',
                        title: 'Error al actualizar la etiqueta',
                        text: 'Por favor intente de nuevo',
                        showConfirmButton: true,
                        timer: 1500
                        })
                  break;
                }
      }
      console.log("Se borrará la etiqueta: " + tag.tag_id + " " + tag.name + " " + userId);
      //Eliminar Tags
      const data2 = await this.tagService.deleteTag(tag.tag_id, userId);
      this.data2 = data2.result;
                if(data2.code !== 'TASK-000'){
                  Swal.fire({
                        icon: 'error',
                        title: 'Error al eliminar la etiqueta',
                        text: 'Por favor intente de nuevo',
                        showConfirmButton: true,
                        timer: 1500
                        })
                }else{
                  this.tags = this.tags.filter(t => t.tag_id !== tag.tag_id);
                }
      } catch (error) {
        console.error('Error al eliminar la etiqueta:', error);
      }
    },
    async saveTags() {
      try {
        const userId = this.$store.getters['getUserId'];
        console.log("userID save : " + userId);
        for (const tag of this.tempTags) {
        if (tag.tag_id) {
          console.log("tagIDE "+JSON.stringify(tag));
          //Actualizar Tasks
          const data = await this.tagService.updateTag(tag.tag_id, { name: tag.name }, userId);
          this.data = data.result;
                if(data.code !== 'TASK-000'){
                  Swal.fire({
                        icon: 'error',
                        title: 'Error al actualizar la etiqueta',
                        text: 'Por favor intente de nuevo',
                        showConfirmButton: true,
                        timer: 1500
                        })
                  break;
                }
        } else {
          console.log("creando tag: "+tag.name+" "+userId);
          //Crear Tasks
          const data = await this.tagService.createTag({ name: tag.name },userId);
          this.data = data.result;
                if(data.code !== 'TASK-000'){
                  Swal.fire({
                        icon: 'error',
                        title: 'Error al crear la etiqueta',
                        text: 'Por favor intente de nuevo',
                        showConfirmButton: true,
                        timer: 1500
                        })
                  break;
                }
        }
      }
      const tagsToDelete = this.tags.filter(tag => !this.tempTags.some(tempTag => tempTag.tag_id === tag.tag_id));
      for (const tag of tagsToDelete) {
        console.log("se borrara: "+tag.tag_id+" "+tag.name+" "+userId);
        this.confirmDeleteTag(tag);
      }
        console.log("A tags"+JSON.stringify(this.tags));
        console.log("A tempTags"+JSON.stringify(this.tempTags));
        this.editing = false;
        this.tags = [...this.tempTags];
        console.log("D tags"+JSON.stringify(this.tags));
        console.log("D tempTags"+JSON.stringify(this.tempTags));
        Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Etiquetas actualizadas exitosamente',
                        showConfirmButton: true,
                        timer: 1500
                        })
        router.push({ name: 'TaskForm' });
      } catch (error) {
        Swal.fire({
                        icon: 'error',
                        title: 'Error al actualizar las etiquetas',
                        text: 'Por favor intente de nuevo',
                        showConfirmButton: true,
                        timer: 1500
                        })
      }
    },
    cancelEdit() {
      this.editing = false;
      JSON.parse(JSON.stringify(this.tags));
      console.log("tags C"+JSON.stringify(this.tags));
      console.log("temp C"+JSON.stringify(this.tempTags));
      this.$router.push({ name: 'TaskForm' });
    },
  },
};
</script>
<style scoped>
</style>
