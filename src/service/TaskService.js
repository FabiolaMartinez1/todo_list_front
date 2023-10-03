// import axios from "axios";

export default class TaskService {

    async getTasks() {
        const url = 'http://localhost:8081/api/v1/task';
        const token = '1';
        const options = {
            method: 'GET',
            headers: {
                Authorization: `${token}`,
                Accept: 'application/json',
            }
        };
        try {
            const response = await fetch(url, options);
            if (!response.ok) {
                throw new Error(`HTTP error: Status: ${response.status}`);
            }
            const tasks = await response.json();
            return tasks;
        } catch (error) {
            console.error('Error al obtener las tareas:', error);
        }
    }

    // url = "http://localhost:8081/api/v1/task";

    // getAll() {
    //     return axios.get(this.url,{
    //         headers: {
    //             'Authorization': '2',
    //             'Accept': 'application/json'
    //         }
    //     }
            
    //         );
    // }
}