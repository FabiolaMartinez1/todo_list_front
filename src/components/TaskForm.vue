<template>
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css">
<div style="margin: 0 auto; width: 70%;">
  <div class="container mt-5">
    <div class="card">
      <div class="card-header text-center">
        <!-- <h1>Nueva Tarea</h1> -->
        <h1 v-if="!$route.params.taskId">Nueva Tarea</h1>
        <h1 v-else>Editar Tarea</h1>
      </div>
      <div class="card-body">
        <form @submit.prevent="createNewTask" >
          <div class="mb-3 form-group">
            <div class="mb-3">
              <label for="name" class="form-label">Nombre:</label>
              <input v-model="task.name" type="text" class="form-control" id="name" required="required">
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
              <input v-model="task.expiry_date" type="date" class="form-control" id="expiryDate" required="required">
            </div>
            <div class="mb-3">
                <label for="tagId" class="form-label">Etiqueta:</label>
                <div class="d-flex align-items-center mb-3">
                  <select v-model="task.tags_tag_id" class="form-select">
                    <option value="" disabled selected>Selecciona una etiqueta</option>
                    <option v-for="tag in tags" :key="tag.tag_id" :value="tag.tag_id">{{ tag.name }}</option>
                  </select>
                  <button @click="newTag" class="btn btn-info"><i class="bi bi-pencil-square"></i></button>
                </div>
            </div>
          </div>
          <div class="d-grid gap-2 col-8 mx-auto">
            <button type="submit" class="btn btn-info">Guardar</button>
          </div>
          <div class="d-grid gap-2 col-8 mx-auto">
            <button type="reset" @click="closeForm" class="btn btn-secondary" style="background-color: #0A0148">Cancelar</button>
          </div>
        </form> 
      </div>
    </div>
  </div>
  </div>
</template>


<script>
import TaskService from '../service/TaskService.js'; 
import TagService from '../service/TagService.js';
import Swal from 'sweetalert2'

export default {
  props: ['taskId', 'name', 'description', 'status', 'expiry_date', 'tags_tag_id'],

  data() {
    return {
      task: {
        name: "",
        status: "Pendiente",
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
        
        const taskId = this.$route.params.taskId;
        console.log('Task ID:', taskId);
        if (taskId) {
          this.task = {
            task_id: this.$route.params.taskId,
            name: this.$route.params.name,
            status: this.$route.params.status,
            description: this.$route.params.description,
            expiry_date: this.$route.params.expiry_date,
            tags_tag_id: this.$route.params.tags_tag_id
          };
        }
    },
  async mounted(){
    const userId = this.$store.getters['getUserId'];
        console.log("ID del usuario reconocido en taskFormCreated : " + userId);
        const response = await this.tagService.getTags(userId);
        this.tags = response.result;
        console.log(this.tags);

        const tareaGuardada = JSON.parse(localStorage.getItem('nuevaTarea'));
        console.log("Tarea guardada en el local: "+tareaGuardada);
        if (tareaGuardada) {
          this.task = tareaGuardada;
        }
  },

  methods: {
    async createNewTask() {
      try {
        const userId = this.$store.getters['getUserId'];
        console.log("ID del usuario reconocido en taskForm : " + userId);
        console.log("Task: "+this.task);
        console.log("Task tagId: "+this.task.tags_tag_id);
        const date_in_utc = this.convert_to_utc(this.task.expiry_date, 'America/La_Paz');
        this.task.expiry_date = date_in_utc.toISOString().split('T')[0];
        console.log("Task creadaUTC: "+JSON.stringify(this.task.expiry_date));
        console.log("Task creada: "+JSON.stringify(this.task));

        if(this.$route.params.taskId){
          //Actualizar tarea
          const data = await this.taskService.updateTask(this.task.task_id, this.task, userId);
          this.data = data.result;
                  if(data.code !== 'TASK-000'){
                    Swal.fire({
                          icon: 'error',
                          title: 'Error al actualizar la etiqueta',
                          text: 'Por favor intente de nuevo',
                          showConfirmButton: true,
                          timer: 1500
                          })
                  }else{
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Tarea actualizada exitosamente',
                        showConfirmButton: true,
                        timer: 1500
                        })
                  }
                  this.$router.push({ name: 'TaskList' });
        }else{
          //Crear tarea
          const data = await this.taskService.createTask(this.task, userId);
          this.data = data.result;
                  if(data.code !== 'TASK-000'){
                    Swal.fire({
                          icon: 'error',
                          title: 'Error al crear la tarea',
                          text: 'Por favor intente de nuevo',
                          showConfirmButton: true,
                          timer: 1500
                          })
                  }else{
                    this.$store.commit('setUserId', userId);
                    const id = this.$store.getters['getUserId'];
                    console.log("ID del usuario reconocido para mandar a task: " + id);
                    Swal.fire({
                                    position: 'center',
                                    icon: 'success',
                                    title: 'Tarea creada exitosamente',
                                    showConfirmButton: true,
                                    timer: 1500
                                    })
                    this.$router.push({ name: 'TaskList' });
                  }
        }
      } catch (error) {
        Swal.fire({
                        icon: 'error',
                        title: 'Error al crear la tarea',
                        text: 'Por favor intente de nuevo',
                        showConfirmButton: true,
                        timer: 1500
                        })
        console.error(error);        
      }
      localStorage.removeItem('nuevaTarea');
    },
    newTag(){
      localStorage.setItem('nuevaTarea', JSON.stringify(this.task));
      console.log("Task creada: "+JSON.stringify(this.task));
      console.log("Task creada: "+this.task);
      this.$router.push({ name: 'TagsList' });
    },
    closeForm(){
      localStorage.removeItem('nuevaTarea');
      this.$router.push({ name: 'TaskList' });
    },
    // Función para convertir a UTC
    convert_to_utc(date, frontend_timezone) {
      var date_in_utc = date;
      if(frontend_timezone=='America/La_Paz'){
        // Convertir la fecha a UTC
          const dateParts = date.split('-');
          const date_in_frontend_timezone = new Date(dateParts[0], dateParts[1] - 1, dateParts[2]);
          // Añadir 1 día
          date_in_frontend_timezone.setDate(date_in_frontend_timezone.getDate() + 1);
          date_in_utc = new Date(date_in_frontend_timezone.getTime() - (date_in_frontend_timezone.getTimezoneOffset() * 60000));
          // this.task.expiry_date = date_in_utc.toISOString().split('T')[0]; // Solo la parte de la fecha sin la hora

      }
      return date_in_utc;
    },
  }
};
</script>
