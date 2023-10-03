<template>
    <div class="login-container">
      <Card>
        <h1>Iniciar Sesión</h1>
        <InputText v-model="nickname" placeholder="Nombre de Usuario" />
        <Password v-model="password" placeholder="Contraseña" />
        <Button label="Iniciar Sesión" @click="login" />
      </Card>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import { Card } from 'primevue/card';
  import { InputText } from 'primevue/inputtext';
  import { Password } from 'primevue/password';
  import { Button } from 'primevue/button';
  
  export default {
    components: {
      Card,
      InputText,
      Password,
      Button
    },
    setup() {
      const nickname = ref('');
      const password = ref('');
  
      const login = () => {
        // Aquí puedes hacer la llamada a tu servicio de inicio de sesión
        // utilizando 'nickname.value' y 'password.value'
      };
  
      return {
        nickname,
        password,
        login
      };
    }
  };
  </script>
  
  <style scoped>
  .login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
  
  .card {
    width: 300px;
    text-align: center;
  }
  </style>
  