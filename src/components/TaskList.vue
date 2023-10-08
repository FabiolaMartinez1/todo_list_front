<template>

<div class="row mx-3">
    <div class="col-md-6 task-meta">
        <div class="btn-group" role="group" aria-label="Basic radio toggle button group">
            <input type="radio" class="btn-check" name="options" id="option1" autocomplete="off" v-model="selectedFilter" value="all" checked>
            <label  class="btn btn-outline-info" for="option1">Todas</label>

            <input type="radio" class="btn-check" name="options" id="option2" autocomplete="off" v-model="selectedFilter" value="pending">
            <label class="btn btn-outline-info" for="option2">Pendientes</label>

            <input type="radio" class="btn-check" name="options" id="option4" autocomplete="off" v-model="selectedFilter" value="completed">
            <label class="btn btn-outline-info" for="option4">Completadas</label>
        </div>
        <div>
                <button @click="newTask" class="p-button p-button-primary" style="background-color: #0A0148"><i class="bi bi-plus-circle mr-2"></i>Crear Nueva Tarea</button>
            </div>
    </div>
</div>

<br>
    <div style="margin: 0 auto; width: 70%;">
        <TPanel header="TASKS">
            <div class="card-container">
                <div class="p-grid p-justify-center">
                    <div v-if="tasks">
                        <div class="" v-for="task in tasks" :key="task.task_id">
                            <div class="task-card">
                                <div class="task-header">
                                    <h3>{{ task.name }}</h3>
                                    <!-- <span class="task-status">{{ task.status }}</span> -->
                                    <span :class="task.status === 'Pendiente' ? 'task-status-pending' : 'task-status-completed'">{{ task.status }}</span>

                                </div>
                                    <div class="task-details">
                                    <p class="task-description">{{ task.description }}</p>            
                                    <div class="task-meta">
                                        <span class="task-tag"><i class="bi bi-tag-fill"></i> {{ getTagName(task.tags_tag_id) }}</span>
                                    </div>  
                                    <span class="task-date"><i class="bi bi-alarm-fill"></i> {{ task.expiry_date }}</span>
                                    <div class="task-meta">
                                        <!-- <button class="btn btn-outline-dark btn-sm mr-2" ><i class="bi bi-pencil-fill"></i> Editar</button> -->
                                        <button @click="editarTarea(task)" class="btn btn-outline-dark btn-sm mr-2">
                                            <i class="bi bi-pencil-fill"></i> Editar
                                        </button>

                                        <button @click="toggleTaskStatus(task)"  class="btn btn-info btn-sm mr-2">
                                            <!-- style="background-color: #37bcb1" -->
                                        {{ task.status === 'Completado' ? 'Marcar como pendiente' : 'Completar' }}
                                        <i class="bi bi-check2-circle"></i>
                                        </button>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- Renderizar la lista de tareas aquí -->
                    </div>
                    <div v-else>
                        <h4>No tienes tareas registradas</h4>
                    </div>

                    
                </div>
            </div>
        </TPanel>
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
                console.log("al montar: "+this.tasks);
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
        editarTarea(task) {
            console.log("tarea a editar: "+task.task_id);
            console.log("tarea a editar: "+JSON.stringify(task));
            this.$router.push({
                name: 'TaskId',
                params: {
                taskId: task.task_id,
                name: task.name,
                description: task.description,
                status: task.status,
                expiry_date: task.expiry_date,
                tags_tag_id: task.tags_tag_id
                }
            });
            }
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
    font-weight: bold;
}

.task-header h3 {
    font-size: 18px;
    margin: 0;
}

.task-status-pending {
    font-weight: bold;  
    color: #ad0458;
}

.task-status-completed {
    font-weight: bold;
    color: #2a8e69;
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
    color: #2196F3;
    font-size: 15px;
    /* font-weight: bold; */
}

.task-date {
    color: #f44336;
    font-size: 14px;
    /* font-weight: bold; */
}
.create-task-button-container {
    text-align: center;
    margin-top: 20px;
}

</style>