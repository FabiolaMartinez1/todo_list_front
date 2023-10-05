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
          <button @click="addNewTag" class="btn btn-success mr-2">
            Nuevo
          </button>
          <button @click="saveTags" class="btn btn-primary mr-2">
            Guardar
          </button>
          <button @click="cancelEdit" class="btn btn-secondary">
            Cerrar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import router from '@/router/router';
import TagService from '../service/TagService.js';
import TaskService from '../service/TaskService.js'; 

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
        // const response = await this.tagService.getTags(userId);
        // this.tags = response.result;
        

        try {
                const [tasks, tags] = await Promise.all([
                    this.taskService.getTasks(userId),
                    this.tagService.getTags(userId),
                ]);
                this.tasks = tasks.result;
                console.log("t"+JSON.stringify(this.tasks));
                this.tags = tags.result;
                console.log("t"+JSON.stringify(this.tags));
            } catch (error) {
                console.error(error);
            }

        this.tempTags = JSON.parse(JSON.stringify(this.tags));
        console.log("tt"+JSON.stringify(this.tempTags));
    },
  methods: {
    addNewTag() {
      this.tempTags.push({ name: '', new: true });
      //TODO: Agregar a la base de datos
    },
    deleteTag(index) {
      const tag = this.tempTags[index];
      if (!tag.new) {
        //TODO Eliminar de la base de datos si no es una nueva etiqueta
      }
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
      // Paso 1: Obtener el número de tareas asignadas a la etiqueta
      const tasksAssignedToTag = this.tasks.filter(task => task.tags_tag_id === tag.tag_id);
      console.log("tasksAssignedToTag: " + tasksAssignedToTag+" # "+tasksAssignedToTag.length);
      if (tasksAssignedToTag.length > 0) {
        const confirmDelete = window.confirm(`La etiqueta "${tag.name}" está asignada a ${tasksAssignedToTag.length} tareas. ¿Estás seguro de que deseas eliminarla?`);
        
        if (!confirmDelete) {
          return; // El usuario cancela la operación
        }
      }

      

      // Paso 3: Actualizar las tareas asignadas a esa etiqueta para que queden sin etiqueta
      for (const task of tasksAssignedToTag) {
        task.tags_tag_id = null;
        // Actualizar la tarea en el backend
        await this.taskService.updateTask(task.task_id, task, userId);
      }
      // Paso 2: Eliminar la etiqueta
      console.log("Se borrará la etiqueta: " + tag.tag_id + " " + tag.name + " " + userId);
      await this.tagService.deleteTag(tag.tag_id, userId);

      // Finalmente, actualizar la lista de etiquetas
      this.tags = this.tags.filter(t => t.tag_id !== tag.tag_id);

      } catch (error) {
        console.error('Error al eliminar la etiqueta:', error);
      }
    },
    async saveTags() {
      const userId = this.$store.getters['getUserId'];
      console.log("userID save : " + userId);
      for (const tag of this.tempTags) {
      if (tag.tag_id) {
        console.log("tagIDE "+JSON.stringify(tag));
        await this.tagService.updateTag(tag.tag_id, { name: tag.name }, userId); //TODO mandar token
      } else {
        console.log("creando tag: "+tag.name+" "+userId);
        await this.tagService.createTag({ name: tag.name },userId);
        
      }
    }

    // Elimina las etiquetas que no están en tempTags
    const tagsToDelete = this.tags.filter(tag => !this.tempTags.some(tempTag => tempTag.tag_id === tag.tag_id));
    for (const tag of tagsToDelete) {
      console.log("se borrara: "+tag.tag_id+" "+tag.name+" "+userId);
      this.confirmDeleteTag(tag);
      // await this.tagService.deleteTag(tag.tag_id, userId);//TODO mandar token
    }
    // confirmDeleteTag(tag);


      console.log("A tags"+JSON.stringify(this.tags));
      console.log("A tempTags"+JSON.stringify(this.tempTags));
      this.editing = false; // Se ha terminado la edición
      this.tags = [...this.tempTags]; // Actualiza tags con tempTags
      console.log("D tags"+JSON.stringify(this.tags));
      console.log("D tempTags"+JSON.stringify(this.tempTags));
      router.push({ name: 'TaskForm' });
    },
    

    cancelEdit() {
      this.editing = false; // Se ha terminado la edición
      JSON.parse(JSON.stringify(this.tags));
      // this.tags.forEach((tag) => (tag.editable = false));
      console.log("tags C"+JSON.stringify(this.tags));
      console.log("temp C"+JSON.stringify(this.tempTags));
      this.$router.push({ name: 'TaskForm' });
    },
  },
};
</script>

<style scoped>
/* Estilos personalizados si es necesario */
</style>
