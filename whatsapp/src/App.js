import React, { useEffect, useState } from "react"
import './App.css';
import Sidebar from "./Sidebar";
import Chat from "./Chat";
import Pusher from 'pusher-js'
import axios from "./axios"

function App() {

const [messages,setMessages]=useState([]);

useEffect(()=>{
  axios.get('http://localhost:9000/messages/sync')
  .then(response=>{
    console.log(response.data)
    setMessages(response.data)
  })
},[])

useEffect(()=>{
  const pusher = new Pusher('7334e3bb719435fada96', {
    cluster: 'ap2'
  });

  var channel = pusher.subscribe('messages');
  channel.bind('inserted', function(data) {
    // alert(JSON.stringify(data));
    setMessages([...messages,data])
  });

  return ()=>{
       channel.unbind_all();
       channel.unsubscribe()
  }

},[messages])

console.log(messages)
  return (
    <div className="app">
      <div className="app__body">
      <Sidebar />
       <Chat messages={messages}/>
      </div>
     
    </div>
  );
}

export default App;
