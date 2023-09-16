import React from 'react'
import "./Sidebar.css"
import DonutLargeIcon from "@mui/icons-material/DonutLarge"
import ChatIcon from "@mui/icons-material/Chat"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import {Avatar, IconButton } from '@mui/material'
import { SearchOutlined } from '@mui/icons-material'
import SidebarChat from './SidebarChat'

function Sidebar() {
  return (
    <div className='sidebar'>
     
      <div className='sidebar__header'>
        {/* <Avatar src='https://imgs.search.brave.com/-TXZoe5PqCheIRqySdRQ7dkZGFsXErqGplqA98co76A/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9jZG4u/dmVjdG9yc3RvY2su/Y29tL2kvcHJldmll/dy0xeC81Ny80NC9t/YWxlLWRvY3Rvci1h/dmF0YXItY2hhcmFj/dGVyLXZlY3Rvci0x/NDg3NTc0NC5qcGc'/> */}
          <div className='sidebar__headerRight'>
           <IconButton>
           <DonutLargeIcon />
           </IconButton>
            <IconButton>
              <ChatIcon />
            </IconButton>
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          </div>
      </div>
      <div className='sidebar__search'>
        <div className='sidebar__searchContainer'>
          <SearchOutlined />
          <input placeholder='Search or start new chat' type='text' />
        </div>
      </div>
      
      <div className='sidebar__chats'>
        <SidebarChat />
        <SidebarChat />
        <SidebarChat />
      </div>

    </div>
  )
}

export default Sidebar
