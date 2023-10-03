<template>
    <div class="login-view">
      <LoginTodo />
    </div>
  </template>
  
  <script>
  import LoginTodo from '../components/LoginTodo.vue';
// import Login from '../components/LoginTodo.vue';
  
  export default {
    components: {
    LoginTodo,
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
  