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
                                    <!-- <span class="task-tag">Etiqueta: {{ task.tags_tag_id }}</span> -->
                                    <span class="task-tag">Etiqueta: {{ getTagName(task.tags_tag_id) }}</span>
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
import TaskService from '../service/TaskService.js';
import TagService from '../service/TagService.js';

export default {
    name: 'TaskApp',
    data(){
        return {
            tasks: [],
            tags: [],
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
                    this.taskService.getTasks(userId),
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
        completarTarea(task_id){
            console.log(task_id);
            this.taskService.completeTask(task_id)
                .then(data => {
                    console.log(data);
                    this.tasks = this.tasks.filter(task => task.task_id != task_id);
                })
                .catch(error => {
                    console.log(error);
                });
        },
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