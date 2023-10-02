import axios from "axios";

export default class TaskService {
    url = "http://localhost:8081/api/v1/task";

    getAll() {
        return axios.get(this.url,{
            headers: {
                'Authorization': '2',
                'Accept': 'application/json'
            }
        }
            
            );
    }
}