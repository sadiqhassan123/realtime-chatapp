import React from 'react'
const API = import.meta.env.VITE_BACKEND_URL;
import SideBar from '../components/SideBar'
import MessageArea from '../components/MessageArea'
import { useSelector } from 'react-redux'
import getMessage from '../customHooks/getMessages'


function Home() {
  let {selectedUser}=useSelector(state=>state.user)
 getMessage()
  return (
    <div className='w-full h-[100vh] flex  '>
     <SideBar/>
     <MessageArea/>
    </div>
  )
}

export default Home
