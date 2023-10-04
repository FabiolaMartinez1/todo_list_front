<template>
    <div style="margin: 0 auto; width: 70%;">
        <TPanel header="TASKS">
            <div class="card-container">
                <div class="p-grid p-justify-center">
                    <div class="p-col-12 p-md-6 p-lg-4" v-for="task in tasks" :key="task.task_id">
                        <div class="task-card">
                            <div class="task-header">
                                <h3>{{ task.name }}</h3>
                                <span class="task-status">{{ task.status }}</span>
                                </div>
                                <div class="task-details">
                                <p class="task-description">{{ task.description }}</p>            
                                <span class="task-date">Fecha Límite: {{ task.expiry_date }}</span>
                                <div class="task-meta">
                                    <span class="task-tag">Etiqueta: {{ task.tags_tag_id }}</span>
                                    <button @click="completarTarea(task.task_id)">Completar</button>
                                </div>  
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </TPanel>
        <div class="create-task-button-container">
            <button @click="newTask" class="p-button p-button-primary">Crear Nueva Tarea</button>
            </div>
    </div>
</template>

<script>
// import TaskApp from './components/TaskApp.vue'
import TaskService from '../service/TaskService.js';

export default {
    name: 'TaskApp',
    data(){
        return {
            tasks: [],
        }
    },
    taskService : null,
    created(){
        this.taskService = new TaskService();
    },
    async mounted(){
        const id = this.$store.getters['getUserId'];
        console.log("ID del usuario reconocido en task : " + id);
        const response = await this.taskService.getTasks(id);
        this.tasks = response.result;
        console.log(this.tasks);
        // this.taskService.getAll()
        //     .then(data => {
        //         this.tasks = data.data.result;
        //         console.log(this.tasks);
        //     })
        //     .catch(error => {
        //         console.log(error);
        //     });
    },
    methods: {
        newTask(){
            this.$router.push({ name: 'TaskForm' });
        },
        // completarTarea(task_id){
        //     console.log(task_id);
        //     this.taskService.completeTask(task_id)
        //         .then(data => {
        //             console.log(data);
        //             this.tasks = this.tasks.filter(task => task.task_id != task_id);
        //         })
        //         .catch(error => {
        //             console.log(error);
        //         });
        // },
        // async crearNuevaTarea(nuevaTarea) {
        //     try {
        //     // Aquí puedes hacer la petición POST al servidor utilizando el TaskService
        //     const response = await this.taskService.createTask(nuevaTarea);

        //     // Si la petición es exitosa, puedes actualizar tu lista de tareas
        //     if (response.ok) {
        //         // Vuelve a cargar la lista de tareas o agrega la nueva tarea a tu array local si lo deseas.
        //         // Por ejemplo:
        //         // this.tasks.push(response.data);
        //         console.log('Nueva tarea creada con éxito:', response.data);
        //     } else {
        //         // Si hay un error en la petición, maneja el caso aquí.
        //         console.error('Error al crear una nueva tarea:', response.error);
        //     }
        // } catch (error) {
        //     // Si ocurre algún error en el proceso de la petición, puedes manejarlo aquí.
        //     console.error('Error al crear una nueva tarea:', error);
        // }
        // }
    }   
}

</script>


<style scoped>
.task-card {
    border: 1px solid #ccc;
    border-radius: 5px;
    margin: 10px;
    padding: 10px;
    background-color: #fff;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
}

.task-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.task-header h3 {
    font-size: 18px;
    margin: 0;
}

.task-status {
    font-weight: bold;
    color: #4caf50; /* Color verde para Completado */
}

.task-details {
    margin-top: 10px;
}

.task-description {
    font-size: 14px;
}

.task-meta {
    display: flex;
    justify-content: space-between;
    font-size: 14px;
}

.task-tag {
    color: #2196F3; /* Color azul para la etiqueta */
    font-size: 15px;
}

.task-date {
    color: #f44336; /* Color rojo para la fecha límite */
    font-size: 14px;
}
.create-task-button-container {
    text-align: center;
    margin-top: 20px;
}
</style>