import axios from "axios";

const usersAPI = axios.create({
    baseURL:"http://localhost:5000/api/v1/users"
})

export default usersAPI