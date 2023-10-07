<!-- //TODO paginar tareas -->
<template>
    <form @submit.prevent="login">
        <div class="login-container">
            <div class="card">
            <i class="icon fa fa-user-circle"></i>
            <h2 class="mb-4">Iniciar Sesión</h2>
            <div class="mb-3">
                <input v-model="nickname" type="text" class="form-control" placeholder="Nombre de Usuario" required="required"/>
            </div>
            <div class="mb-3">
                <input v-model="password" type="password" class="form-control" placeholder="Contraseña" required="required"/>
            </div>
            <button type="submit" class="p-button p-button-primary" style="background-color: #37bcb1">Iniciar Sesión</button>
            </div>
        </div>
    </form>
</template>

<script>
import LoginService from '../service/LoginService.js'; 
import Swal from 'sweetalert2'

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

            const loginService = new LoginService(this.$store);
            try {
                const data = await loginService.login(this.nickname, this.password);
                console.log(data);
                this.data = data.result;
                if(data.code === 'TASK-000'){ 
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Login Exitoso',
                        text: 'Bienvenid@ '+this.nickname+'!',
                        showConfirmButton: true,
                        timer: 1500
                        })
                    console.log("Usuario encontrado");
                    this.$store.commit('setUserId', data.result.userId);
                    const id = this.$store.getters['getUserId'];
                    console.log("ID del usuario reconocido en task : " + id);

                    this.$router.push({ name: 'TaskList' });
                }else{
                    Swal.fire({
                        icon: 'error',
                        title: 'Login fallido',
                        text: 'Por favor, revisa tu usuario y contraseña',
                        showConfirmButton: true,
                        timer: 1500
                        })
                    console.log("Usuario no encontrado");
                    this.$router.push({ name: 'LoginView' });
                }
            } catch (error) {
                Swal.fire({
                        icon: 'error',
                        title: 'Login fallido',
                        text: 'Por favor, revisa tu usuario y contraseña',
                        showConfirmButton: true,
                        timer: 1500
                        })
                console.error(error);
            }
        }
    },
}

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
.icon {
    font-size: 100px;
    color: #000;
    margin-bottom: 20px;
}
</style>
