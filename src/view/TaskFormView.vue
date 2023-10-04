<template>
    <div class="task-form-view">
      <!-- <TaskForm @nueva-tarea="enviarTarea" /> -->
      <TaskForm />
    </div>
  </template>
  
  <script>
  import TaskForm from "../components/TaskForm.vue";
  
  export default {
    components: {
      TaskForm
    },
    // methods: {
    //   enviarTarea(tarea) {
    //     this.$store.dispatch("crearNuevaTarea", tarea);
    //   }
    // }
  };
  </script>

<!-- <template>
  <div>
    <TaskForm @nueva-tarea="enviarTarea" />
  </div>
</template>

<script>
import TaskForm from "@/components/TaskForm.vue";

export default {
  components: {
    TaskForm
  },
  methods: {
    enviarTarea(tarea) {
      this.$store.dispatch("crearNuevaTarea", tarea);
    }
  }
};
</script> -->