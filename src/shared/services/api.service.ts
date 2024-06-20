


const apiService = {
    get(endpoint: string, params = {}) {
        return fetch(`${endpoint}`)
    },
};

export default apiService;