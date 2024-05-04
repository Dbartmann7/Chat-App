import axios from "axios";

const usersAPI = axios.create({
    baseURL:`${process.env.REACT_APP_EXPRESS_SERVER}/api/v1/users`
})

export default usersAPI