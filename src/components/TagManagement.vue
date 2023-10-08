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
            <i class="bi bi-trash3 mr-2 ml-2"></i>
            </button>
            <button
              v-if="tag.new"
              @click="deleteNewTag(index)"
              class="btn btn-danger"
            >
            <i class="bi bi-trash3 mr-2 ml-2"></i>
            </button>
          </div>
          <div class="d-flex justify-content-center">
            <button @click="addNewTag" class="btn btn-success mr-2" style="background-color: #2eae85">
              <i class="bi bi-plus-circle mr-2"></i>
              Nuevo
            </button>
            <button @click="saveTags" class="btn btn-info mr-2">
              <i class="bi bi-save2 mr-2"></i>
              Guardar
            </button>
            <button @click="cancelEdit" class="btn btn-secondary" style="background-color: #0A0148">
              <i class="bi bi-x-circle mr-2"></i>
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
            if(!this.tags){
              this.tempTags = [];
            }else{
              this.tempTags = JSON.parse(JSON.stringify(this.tags));
            }
        
        // console.log("tt"+JSON.stringify(this.tempTags));
    },
  methods: {
    addNewTag() {
      //TODO si temTags esta vacio
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
      if(this.tasks){
        const tasksAssignedToTag = this.tasks.filter(task => task.tags_tag_id === tag.tag_id);
        console.log("tasksAssignedToTag: " + tasksAssignedToTag+" # "+tasksAssignedToTag.length);
        if (tasksAssignedToTag.length > 0) {
          const confirmDelete = window.confirm(`La etiqueta "${tag.name}" está asignada a ${tasksAssignedToTag.length} tareas. ¿Estás seguro de que deseas eliminarla?`);
          if (!confirmDelete) {
            console.info("Las tareas no se kes eliminarán las tags");
            return;
          }else{
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
                      }else{
                        console.log("Se actualizó la tarea: " + task.task_id + " " + task.name + " " + userId);
                      }
            }
          }
        }
      }else{
        console.log("No hay tareas");
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
                  console.log("Se eliminó la etiqueta: " + tag.tag_id + " " + tag.name + " " + userId);
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
          console.log("0");
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
                }else{
                  console.log("Se actualizó la etiqueta: " + tag.tag_id + " " + tag.name + " " + userId);
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
                        text: 'Por favor intente de nuevo TT',
                        showConfirmButton: true,
                        timer: 1500
                        })
                  break;
                }else{
                  console.log("Se creó la etiqueta: " + tag.tag_id + " " + tag.name + " " + userId);
                  console.log(this.tempTags);
                  // if(!this.tempTags){
                  //   break;
                  // }
                }
        }
      }
      const tagsToDelete = this.tags.filter(tag => !this.tempTags.some(tempTag => tempTag.tag_id === tag.tag_id));
      console.log("1");
      for (const tag of tagsToDelete) {
        console.log("2");
        console.log("se borrara: "+tag.tag_id+" "+tag.name+" "+userId);
        console.log("3");
        this.confirmDeleteTag(tag);
        console.log("4");
      }

        // console.log("A tags"+JSON.stringify(this.tags));
        // console.log("A tempTags"+JSON.stringify(this.tempTags));
        console.log("5");
        this.editing = false;
        console.log("6");
        this.tags = [...this.tempTags];
        console.log("7");
        // console.log("D tags"+JSON.stringify(this.tags));
        // console.log("D tempTags"+JSON.stringify(this.tempTags));
        Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Etiquetas actualizadas exitosamente',
                        showConfirmButton: true,
                        timer: 1500
                        });
        console.log("8");
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
