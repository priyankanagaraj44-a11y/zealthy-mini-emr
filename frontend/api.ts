import axios from "axios"

const api = axios.create({
 baseURL: "https://zealthy-mini-emr-4.onrender.com"
})

export default api