
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
// import { ref } from 'vue';
import LoginService from '../service/LoginService.js'; 

export default {
    name: 'LoginTodo',
    data(){
        return{
            nickname: '',
            password: ''
        }
    },
    created(){
        this.loginService = new LoginService();
    },
    methods:{
        async login(){
            console.log(this.nickname);
            console.log(this.password);
            
            this.loginService.login(this.nickname, this.password).then((data)=>{
                console.log(data);
            }).catch(error=>{
                console.log(error);
            });
            // console.log('Respuesta del servicio de inicio de sesión:', response);
        
            
        }
        },
        
        
    }

// import {LoginService} from '../service/LoginService.js'; 

// export default {
//     setup() {
//         const nickname = ref('');
//         const password = ref('');
//         const login = async () => {
//             console.log(nickname.value);
//             console.log(password.value);
//             try {
//                 const response = await LoginService.login(nickname.value, password.value);
//                 console.log('Respuesta del servicio de inicio de sesión:', response);
//             } catch (error) {
//                 console.error('Error al iniciar sesión:CTM', error);
//             }
//         };
//         return {
//             nickname,
//             password,
//             login
//         };
//     }
// };

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
