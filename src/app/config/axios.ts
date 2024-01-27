import axios from 'axios';
// const BASE_URL = ''
export function configureAxios() {
    axios.defaults.baseURL = "http://localhost:3000";   
    axios.defaults.withCredentials = true;

}