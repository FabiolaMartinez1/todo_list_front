// import axios from "axios";

export default class TaskService {

    async getTasks(id) {
        const url = 'http://localhost:8081/api/v1/task';
        const token = id;
        const options = {
            method: 'GET',
            headers: {
                Authorization: token,
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
    async createTask(tarea, token) {
        console.log('entro al createTask()\n'+tarea);
        const url = "http://localhost:8081/api/v1/task";
        const options = {
            method: "POST",
            headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: token
            },
            body: JSON.stringify(tarea)
        };
        console.log('options', options);
        try {
            const response = await fetch(url, options);
            if (!response.ok) {
                throw new Error(`HTTP error: Status ${response.status}`);
            }
            const data = await response.json();
            // router.push({ name: 'TaskList' });
            return data;
        } catch (error) {
            console.error("Error al crear una nueva tarea SV:", error);
            throw error;
        }
    }  
}