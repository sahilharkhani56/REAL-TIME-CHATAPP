import './App.css'
import Chat from './components/Chat'
import React, { useState, useEffect } from "react";
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import Username from './components/Login.jsx'
// import Password from './components/Password.jsx'
import Register from './components/Register.jsx'
// import Recovery from './components/Recovery.jsx'
import Profile from './components/Profile.jsx'
import PageNotFound from './components/PageNotFound.jsx'
// import Reset from './components/Reset.jsx'
import {AuthrizerUser} from './middleware/auth'
import { BrowserRouter as Router,Routes, Route} from 'react-router-dom';

// import socketIOClient from "socket.io-client";
// const ENDPOINT = "http://127.0.0.1:3000";

// // import { socket } from './socket';


// import socketIO from 'socket.io-client';
// const socket = socketIO.connect('http://localhost:3000');
const router=createBrowserRouter([
  {
    path:'/',
    element:<Username></Username>
  },
  {
    path:'/register',
    element:<Register></Register>
  },
  // {
  //   path:'/password',
  //   element:<ProtectRoute><Password/></ProtectRoute>
  // },
  // {
  //   path:'/recovery',
  //   element:<Recovery></Recovery>
  // },
  {
    path:'/profile',
    element:<AuthrizerUser><Profile/></AuthrizerUser>
  },
  {
    path:'*',
    element:<PageNotFound></PageNotFound>
  },
  // {
  //   path:'/Reset',
  //   element:<Reset></Reset>
  // },
  {
    path:'/chat',
    element:<AuthrizerUser><Chat/></AuthrizerUser>
    // element:<Chat></Chat>
  }
])
function App() {
  // const [response, setResponse] = useState("");

  // useEffect(() => {
  //   const socket = socketIOClient(ENDPOINT);
  //   socket.on("FromAPI", data => {
  //     setResponse(data);
  //   });
  //   return () => socket.disconnect();
  // }, []);


  return (
    <>
<main>
      <RouterProvider router={router}></RouterProvider>
    </main>
    </>
  )
}

export default App
