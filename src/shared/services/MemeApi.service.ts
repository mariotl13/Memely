export default class MemeApiService {

    constructor() { }

    static async get(endpoint: string, params = {}) {
        try {
            const response = await fetch(endpoint, params);
            return response.json();
        } catch (error) {
            console.log(error);
        }
    }

    static async post(endpoint: string, data = {}) {
        try {
            const response = await fetch(endpoint, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams(data)
            });
            return response.json();
        } catch (error) {
            console.log(error);
        }
    }
};