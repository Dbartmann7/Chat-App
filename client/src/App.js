import './App.css';
import React,  {useContext, useEffect, useState} from "react"
import ChatPage from './Components/ChatPage/ChatPage';
import { UserContext } from './Contexts/UserContext';
import UserLoginPage from './Components/UserLogin/UserLoginPage';

function App() {
  const {loggedIn} = useContext(UserContext)
  return (
    <div className="App">
        {loggedIn ? <ChatPage/>: <UserLoginPage/>}
    </div>
  );
}

export default App;
