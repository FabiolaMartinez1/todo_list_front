// import axios from "axios";

export default class TaskService {

    async getTasks(id, status) {
        console.log('id', id);
        var url = 'http://localhost:8081/api/v1/task';
        console.log('status', status);
        if (status) {
            url += `?status=${status}`;
        }
        console.log('url', url);
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
    async createTask(task, token) {
        console.log('entro al createTask()\n'+task);
        const url = "http://localhost:8081/api/v1/task";
        const options = {
            method: "POST",
            headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: token
            },
            body: JSON.stringify(task)
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
    async updateTask(taskId, task, token) {
        console.log('entro al updateTask()\n'+task+' ID'+taskId);
        const url = `http://localhost:8081/api/v1/task/${taskId}`;
        console.log('url', url);
        const options = {
            method: "PUT",
            headers: {
            "Content-Type": "application/json",
            Authorization: token
            },
            body: JSON.stringify(task)
        };
        try {
            const response = await fetch(url, options);
            if (!response.ok) {
                throw new Error(`HTTP error: Status ${response.status}`);
            }
            const data = await response.json();
            console.log('Se actualizo data', data);
            return data;
        } catch (error) {
            console.error("Error al actualizar la tarea:", error);
            throw error;
        }
    }
}