<template>
<div style="margin: 0 auto; width: 70%;">
    <!-- <TPanel header="Nueva Tarea"> -->
  <div class="container mt-5">
    <div class="card">
      <div class="card-header text-center">
        <h1>Nueva Tarea</h1>
      </div>
      <div class="card-body">
        <form>
          <div class="mb-3">
            <label for="name" class="form-label">Nombre:</label>
            <input v-model="task.name" type="text" class="form-control" id="name">
          </div>
          <div class="mb-3">
            <label for="status" class="form-label">Estado:</label>
            <input v-model="task.status" type="text" class="form-control" id="status" readonly>
          </div>
          <div class="mb-3">
            <label for="description" class="form-label">Descripción:</label>
            <textarea v-model="task.description" class="form-control" id="description"></textarea>
          </div>
          <div class="mb-3">
            <label for="expiryDate" class="form-label">Fecha de Vencimiento:</label>
            <input v-model="task.expiry_date" type="date" class="form-control" id="expiryDate">
          </div>
          <!-- <div class="mb-3">
            <label for="tagId" class="form-label">ID de Etiqueta:</label>
            <div class="d-flex align-items-center mb-3">
              <input v-model="task.tags_tag_id" type="text" class="form-control mr-2" id="tagId">
              <button @click="newTag" class="btn btn-info">New</button>
            </div>
          </div> -->
          <div class="mb-3">
              <label for="tagId" class="form-label">Etiqueta:</label>
              <div class="d-flex align-items-center mb-3">
                <select v-model="task.tags_tag_id" class="form-select">
                  <option value="" disabled selected>Selecciona una etiqueta</option>
                  <option v-for="tag in tags" :key="tag.tag_id" :value="tag.tag_id">{{ tag.name }}</option>
                </select>
                <button @click="newTag" class="btn btn-info">New</button>
              </div>
            </div>
          <div class="d-grid gap-2 col-8 mx-auto">
            <button @click.prevent="createNewTask" class="btn btn-primary">Guardar</button>
          </div>
          <div class="d-grid gap-2 col-8 mx-auto">
            <button @click="closeForm" class="btn btn-secondary">Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  </div>
    <!-- </TPanel> -->
  </div>
</template>

<script>
import TaskService from '../service/TaskService.js'; 
import TagService from '../service/TagService.js';

export default {
  data() {
    return {
      task: {
        name: "",
        status: "Pendiente ",
        description: "",
        expiry_date: "",
        tags_tag_id: ""
      },
      tags: [],
    };
  },
  async created(){
        this.taskService = new TaskService();
        this.tagService = new TagService();

        
    },
  async mounted(){
    const userId = this.$store.getters['getUserId'];
        console.log("ID del usuario reconocido en taskFormCreated : " + userId);
        const response = await this.tagService.getTags(userId);
        this.tags = response.result;
        console.log(this.tags);
  },
  methods: {
    async createNewTask() {
      try {
        const userId = this.$store.getters['getUserId'];
        console.log("ID del usuario reconocido en taskForm : " + userId);
        console.log("Task: "+this.task);
        console.log("Task tagId: "+this.task.tags_tag_id);
        await this.taskService.createTask(this.task, userId);
        //Guardar datos en el LocalStorage
        // localStorage.setItem('savedTask', JSON.stringify(this.task));

        this.$store.commit('setUserId', userId);
        const id = this.$store.getters['getUserId'];
        console.log("ID del usuario reconocido para mandar a task: " + id);
        this.$router.push({ name: 'TaskList' });
      } catch (error) {
        console.error(error);        
      }
    },
    newTag(){
      this.$router.push({ name: 'TagsList' });
    },
    closeForm(){
      // localStorage.removeItem('savedTask');
      this.$router.push({ name: 'TaskList' });
    }
  }
};
</script>
