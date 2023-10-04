<template>
    <!-- <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous"> -->
    <div>
        <h1>Lista de Tareas</h1>
        <TaskList />
    </div>
</template>

<script>  
import TaskList from "../components/TaskList.vue";

export default {
    components: {
        TaskList,
    },
};
</script>
