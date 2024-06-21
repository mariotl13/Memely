export default class MemeApiService {

    constructor() {}

    static async get(endpoint: string, params = {}) {
        try {
            const response = await fetch(endpoint, params);
            return response.json();
        } catch (error) {
            console.log(error);
        }
    }
};