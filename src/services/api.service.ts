import axios, { AxiosRequestConfig } from "axios";

const ApiService = {
    _requestInterceptor: 0,
    
    init(baseURL: string | undefined) {
        axios.defaults.baseURL = baseURL;
    },

    get(resource: string) {
        return axios.get(resource);
    },

    post(resource: string, data: any) {
        return axios.post(resource, data);
    },

    put(resource: string, data: any) {
        return axios.put(resource, data);
    },

    delete(resource: string) {
        return axios.delete(resource);
    },

    customRequest(data: AxiosRequestConfig) {
        return axios(data);
    },
}

export default ApiService;