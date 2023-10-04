import { createStore } from 'vuex';
import LoginService from '../service/LoginService.js'; 
import TaskService from '../service/TaskService.js'; 
export default createStore({
    state: {
        userId: null
    },
    mutations: {
        setUserId(state, userId) {
            state.userId = userId;
        }
    },
actions: {
    async loginUser({ commit }, { nickname, password }) {
        try {
            const response = await LoginService.login(nickname, password);
            const userId = response.userId; // Obtener el userId de la respuesta del servicio
            commit('setUserId', userId); // Actualizar el userId en el estado
        } catch (error) {
            console.error('Error al iniciar sesiónX:', error);
            // Manejar errores si es necesario
        }
    },
    
    async crearNuevaTarea({ commit, rootState }, tarea) {
        try {
            const token = rootState.userId; // Obtener el token de tu estado
            const response = await TaskService.crearNuevaTarea(tarea, token);
            const userId = response.userId; 
            commit('setUserId', userId);
            // Puedes hacer algo con la respuesta si es necesario
        } catch (error) {
            console.error("Error al crear una nueva tarea:", error);
        }
    }
},
getters: {
    getUserId: state => state.userId
}
});
