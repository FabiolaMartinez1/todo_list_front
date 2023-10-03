import router from "@/router/router";

export default class LoginService {
    constructor(store) {
        this.store = store;
    }

    async login(nickname, password) {
        console.log('entro al login()'+'nickname', nickname);
        const url = 'http://localhost:8081/api/v1/login';
        const options = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nickname,
            password
        })
        };
        try {
            const response = await fetch(url, options);
            if (!response.ok) {
                throw new Error('HTTP error: Status ' + response.status);
            }
            const data = await response.json();
            console.log('data', data);
            // const userId = data.result.userId;
            // this.$store.commit('setUserId', userId);
            // commit('setUserId', userId); 
            router.push({ name: 'TaskList' });
            return data;
        } catch (error) {
            console.error('Error al iniciar sesión:SV', error);
            throw error;
        }
    }
}  