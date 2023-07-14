import axios from "axios";

const chatsAPI = axios.create({
    baseURL:"http://localhost:5000/api/v1/chats"
})

export default chatsAPI