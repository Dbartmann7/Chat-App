import axios from "axios";

const chatsAPI = axios.create({
    baseURL:`${process.env.REACT_APP_EXPRESS_SERVER_ADDRESS}/api/v1/chats`
})

export default chatsAPI