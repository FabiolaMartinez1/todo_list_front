export default class LoginService {
    async login(nickname, password) {
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
        return data;
      } catch (error) {
        console.error('Error al iniciar sesión:', error);
        throw error;
      }
    }
  }
  