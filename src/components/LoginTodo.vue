
<template>
    <div class="login-container">
        <div class="card">
        <h1 class="mb-4">Iniciar Sesión</h1>
        <div class="mb-3">
            <input v-model="nickname" type="text" class="form-control" placeholder="Nombre de Usuario" />
        </div>
        <div class="mb-3">
            <input v-model="password" type="password" class="form-control" placeholder="Contraseña" />
        </div>
        <button @click="login" class="btn btn-primary">Iniciar Sesión</button>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';

export default {
    setup() {
        const nickname = ref('');
        const password = ref('');
        const login = () => {
            console.log(nickname.value);
            console.log(password.value);
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
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  .card input {
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
  }
  
  .card button {
    width: 100%;
  }
  </style>
  