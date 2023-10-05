export default class TagService {

    async getTags(id) {
        const url = 'http://localhost:8081/api/v1/tag';
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
            const tags = await response.json();
            return tags;
        } catch (error) {
            console.error('Error al obtener las tareas:', error);
        }
    }
    async createTag(tag, token) {
        console.log('entro al createTask()\n'+tag);
        const url = "http://localhost:8081/api/v1/tag";
        const options = {
            method: "POST",
            headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: token
            },
            body: JSON.stringify(tag)
        };
        console.log('options', options);
        try {
            const response = await fetch(url, options);
            if (!response.ok) {
                throw new Error(`HTTP error: Status ${response.status}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error al crear una nueva tarea SV:", error);
            throw error;
        }
    }  

    async updateTag(tagId, tag, token) {
        console.log('entro al updateTask()\n'+tag+' ID'+tagId);
        const url = `http://localhost:8081/api/v1/tag/${tagId}`;
        console.log('url', url);
        const options = {
            method: "PUT",
            headers: {
            "Content-Type": "application/json",
            Authorization: token
            },
            body: JSON.stringify(tag)
        };
        console.log('options', options);
        try {
            const response = await fetch(url, options);
            if (!response.ok) {
                throw new Error(`HTTP error: Status ${response.status}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error al actualizar una nueva tarea SV:", error);
            throw error;
        }
    }

    async deleteTag(tagId, token) {
        console.log('entro al deleteTask()\n'+tagId+' ID'+token);
        const url = `http://localhost:8081/api/v1/tag/${tagId}`;
        const options = {
            method: "DELETE",
            headers: {
                "Accept": 'application/json',
                "Content-Type": "application/json",
                Authorization: token
            },
        };
        console.log('options', options);
        try {
            const response = await fetch(url, options);
            if (!response.ok) {
                throw new Error(`HTTP error: Status ${response.status}`);
            }
            const data = await response.json();
            console.log("se elimino: "+data);
            console.log("se elimino: "+data.message);
            
            return data;
        } catch (error) {
            console.error("Error al eliminar una nueva tarea SV:", error);
            throw error;
        }
    }
}