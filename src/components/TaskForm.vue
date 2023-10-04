<template>
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
            <input v-model="task.status" type="text" class="form-control" id="status">
          </div>
          <div class="mb-3">
            <label for="description" class="form-label">Descripción:</label>
            <textarea v-model="task.description" class="form-control" id="description"></textarea>
          </div>
          <div class="mb-3">
            <label for="expiryDate" class="form-label">Fecha de Vencimiento:</label>
            <input v-model="task.expiry_date" type="date" class="form-control" id="expiryDate">
          </div>
          <div class="mb-3">
            <label for="tagId" class="form-label">ID de Etiqueta:</label>
            <input v-model="task.tags_tag_id" type="text" class="form-control" id="tagId">
          </div>
          <div class="d-grid">
            <button @click.prevent="crearNuevaTarea" class="p-button p-button-primary">Crear Tarea</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import TaskService from '../service/TaskService.js'; 

export default {
  data() {
    return {
      task: {
        name: "",
        status: "",
        description: "",
        expiry_date: "",
        tags_tag_id: ""
      }
    };
  },
  created(){
        this.taskService = new TaskService();
        
    },
  async mounted(){
        
  },
  methods: {
    async crearNuevaTarea() {
      // this.$emit("nueva-tarea", this.task);
      // console.log("Crear tarea"+this.task);
      // console.log(this.task.name+this.task.status+this.task.description+this.task.expiry_date+this.task.tags_tag_id);
      // console.log("user: "+this.userId);

      // const taskService = new TaskService(this.$store);
      try {
        // console.log(data);
        const userId = this.$store.getters['getUserId'];
        console.log("ID del usuario reconocido en taskForm : " + userId);

        console.log(this.task);
        console.log(this.id);
        // console.log(id);
        const data = await this.taskService.createTask(this.task, userId);
        console.log(data);
        this.$store.commit('setUserId', data.result.userId);
        const id = this.$store.getters['getUserId'];
        console.log("ID del usuario reconocido en task : " + id);
        this.$router.push({ name: 'TaskList' });
      } catch (error) {
        console.error(error);        
      }
    }
  }
};
</script>
