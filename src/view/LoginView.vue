<template>
    <div class="login-view">
      <Login />
    </div>
  </template>
  
  <script>
  import Login from '../components/LoginTodo.vue';
  
  export default {
    components: {
      Login
    }
  };
  </script>
  
  <style scoped>
  .login-view {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f0f0f0; /* Color de fondo */
  }
  </style>
  