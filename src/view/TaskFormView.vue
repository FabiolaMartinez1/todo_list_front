<template>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
  
    <div>
      <!-- <h1>Registrar nueva Tarea</h1> -->
      <TaskForm />
    </div>
  </template>
  
  <script>
  import TaskForm from "../components/TaskForm.vue";
  
  export default {
    components: {
      TaskForm
    },
  };
  </script>