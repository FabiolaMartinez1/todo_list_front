<template>
        <!-- <DataView :value="tasks " >
            <div class="text-2xl font-bold text-900">{{ tasks }}</div>
        </DataView> -->

        <div style="margin: 0 auto; width: 80%;">
            <TPanel header="TAGS">
                <DataTable :value="tasks">
                    <TColumn field="name" header="Nombre"></TColumn>
                    <TColumn field="description" header="Descripcion"></TColumn>
                    <TColumn field="status" header="Estado"></TColumn>
                    <TColumn field="tags_tag_id" header="Etiqueta"></TColumn>
                    <TColumn field="expiry_date" header="Fecha Limite"></TColumn>
                    <!-- <p>{{ tasks }}</p> -->
                </DataTable>

            </TPanel>
        </div>

</template>
<!-- <template>
    <div class="card">
        <DataView :value="task"> -->
            <!-- <template #list="slotProps">
                <div class="col-12">
                    <div class="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4">
                        <div class="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                            <div class="flex flex-column align-items-center sm:align-items-start gap-3">
                                <div class="text-2xl font-bold text-900">{{ slotProps.data.name }}</div>
                                <div class="flex align-items-center gap-3">
                                    <span class="flex align-items-center gap-2">
                                        <i class="pi pi-tag"></i> -->
                                        <!-- <span class="font-semibold">{{ slotProps.data.description }}</span> -->
                                    <!-- </span> -->
                                    <!-- <Tag :value="slotProps.data.status" :severity="getSeverity(slotProps.data)"></Tag> -->
                                <!-- </div>
                            </div>
                            <div class="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2"> -->
                                <!-- <span class="text-2xl font-semibold">${{ slotProps.data.expiry_date }}</span> -->
                                <!-- <Button icon="pi pi-shopping-cart" rounded :disabled="slotProps.data.inventoryStatus === 'OUTOFSTOCK'"></Button> -->
                            <!-- </div>
                        </div>
                    </div>
                </div>
            </template> -->
        <!-- </DataView>
    </div>
</template> -->

<script>
// import TaskApp from './components/TaskApp.vue'
import TaskService from '../service/TaskService.js'
export default {
    name: 'TaskApp',
    data(){
        return {
            tasks: [],
            // task : null,
            // tasks: [],
            // task: {
            //     name: null,
            //     // completed: false
            // }
        }
    },
    taskService : null,
    // methods: {
    // itemTemplate(task) {
    //     return `
    //         <div>
    //         <h3>${task.result.name}</h3>
    //         </div>
    //     `;
    //     },
    // },
    created(){
        this.taskService = new TaskService();
    },
    mounted(){
        this.taskService.getAll()
            .then(data => {
                this.tasks = data.data.result;
                console.log(this.tasks);
            })
            .catch(error => {
                console.log(error);
            });
    },
}

</script>

<style>

</style>