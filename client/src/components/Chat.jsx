import React, { useState } from "react";
import Sidebar from "./Sidebar";
// import Footer from "./Footer";
import Chat_view from "./ChatView";
const Chat = () => {
  const [data,setData]=useState([]);
  const [message,setMessage]=useState();
  const pull_data = (data) => {
    setData(data)
  }
  return (
    <>
      <div className="flow-root h-screen w-100 box-border p-4 border-0 border-gray-900" style={{backgroundColor:"#fff"}}>
        <Sidebar func={pull_data} />
          <Chat_view data={data}/>
      </div>
    </>
  );
};

export default Chat;
