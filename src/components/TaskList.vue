<template>

<div class="row mx-3">
    <div class="col-md-6">
    <div class="btn-group" role="group" aria-label="Basic radio toggle button group">
        <input type="radio" class="btn-check" name="options" id="option1" autocomplete="off" v-model="selectedFilter" value="all" checked>
        <label class="btn btn-outline-primary" for="option1">Todas</label>

        <input type="radio" class="btn-check" name="options" id="option2" autocomplete="off" v-model="selectedFilter" value="pending">
        <label class="btn btn-outline-primary" for="option2">Pendientes</label>

        <input type="radio" class="btn-check" name="options" id="option4" autocomplete="off" v-model="selectedFilter" value="completed">
        <label class="btn btn-outline-primary" for="option4">Completadas</label>
    </div>
</div>
</div>

<br>
    <div style="margin: 0 auto; width: 70%;">
        <TPanel header="TASKS">
            <div class="card-container">
                <div class="p-grid p-justify-center">
                    <div class="" v-for="task in tasks" :key="task.task_id">
                        <div class="task-card">
                            <div class="task-header">
                                <h3>{{ task.name }}</h3>
                                <span class="task-status">{{ task.status }}</span>
                                </div>
                                <div class="task-details">
                                <p class="task-description">{{ task.description }}</p>            
                                <span class="task-date">Fecha Límite: {{ task.expiry_date }}</span>
                                <div class="task-meta">
                                    <!-- <span class="task-tag">Etiqueta: {{ task.tags_tag_id }}</span> -->
                                    <span class="task-tag">Etiqueta: {{ getTagName(task.tags_tag_id) }}</span>
                                    <!-- <button @click="completeTask(task)">Completar</button> -->
                                    <!-- <button @click="toggleTaskStatus(task)" v-if="task.status === 'Pendiente'">Completar</button>
                                    <button @click="toggleTaskStatus(task)" v-else>Marcar como pendiente</button> -->
                                    <button @click="toggleTaskStatus(task)">
                                    {{ task.status === 'Completado' ? 'Marcar como pendiente' : 'Completar' }}
                                    </button>
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
import TaskService from '../service/TaskService.js';
import TagService from '../service/TagService.js';
// import router from '@/router/router';

export default {
    name: 'TaskApp',
    data(){
        return {
            tasks: [],
            tags: [],
            selectedFilter: 'all',
        }
    },
    taskService : null,
    tagService : null,
    created(){
        this.taskService = new TaskService();
        this.tagService = new TagService();
    },
    async mounted(){
        
        const userId = this.$store.getters['getUserId'];
        console.log("ID del usuario reconocido en task : " + userId);
            try {
                const [tasks, tags] = await Promise.all([
                    this.taskService.getTasks(userId,null),
                    this.tagService.getTags(userId),
                ]);
                this.tasks = tasks.result;
                console.log(this.tasks);
                this.tags = tags.result;
                console.log(this.tags);
            } catch (error) {
                console.error(error);
            }
    },
    methods: {
        getTagName(tagId) {
            const tag = this.tags.find(tag => tag.tag_id === tagId);
            return tag ? tag.name : '*Sin etiqueta*';
        },
        newTask(){
            this.$router.push({ name: 'TaskForm' });
        },
        async toggleTaskStatus(task){
            console.log("tarea a completar: "+task);
            try {
                const userId = this.$store.getters['getUserId'];
                console.log("ID del usuario reconocido en task : " + userId);

                const updatedTask = {
                    name: task.name,
                    description: task.description,
                    tags_tag_id: task.tags_tag_id,
                    status:  task.status === 'Pendiente' ? 'Completado' : 'Pendiente', // Estado actualizado
                    expiry_date: task.expiry_date,
                    completion_date: new Date//().toISOString().split('T')[0] // Fecha de completado actual
                };
                console.log("datos actualizados: "+JSON.stringify(updatedTask));
                await this.taskService.updateTask(task.task_id, updatedTask, userId);
                console.log("tarea actualizada"+JSON.stringify(updatedTask));
                // router.push({ name: 'TaskList' });
                task.status = updatedTask.status;
                this.filterTasks();
            } catch (error) {
                console.error('Error al cambiar el estado de la tarea:', error);
            }
        },
        async filterTasks() {
            const userId = this.$store.getters['getUserId'];
            try {
                switch(this.selectedFilter) {
                    case 'all':
                        var response = await this.taskService.getTasks(userId,null);
                        this.tasks = response.result;
                        break;
                    case 'pending':
                        var response1 = await this.taskService.getTasks(userId,"Pendiente");
                        this.tasks = response1.result;
                        break;
                    case 'completed':
                        var response2 = await this.taskService.getTasks(userId,"Completado");
                        this.tasks = response2.result;
                        break;
                    default:
                        // En caso de un filtro no reconocido, obtén todas las tareas
                        this.tasks = await this.taskService.getTasks(userId,null);
                        break;
                }
            } catch (error) {
                console.error(error);
            }
        },
    },  
    watch: {
        selectedFilter: {
            handler: 'filterTasks',
            immediate: true // Esto lo hará ejecutar inmediatamente cuando el componente se monte
        }
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