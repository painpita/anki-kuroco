import axios from "axios"

export default axios.create({
    baseURL: 'https://kurokanji.g.kuroco.app/rcms-api/',
    credentials: true,
    withCredentials: true
})