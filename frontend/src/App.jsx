import React, { useEffect, lazy, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import getCurrentUser from './customHooks/getCurrentUser'
import getOtherUsers from './customHooks/getOtherUsers'
import { useDispatch, useSelector } from 'react-redux'
import { io } from "socket.io-client"
import { serverUrl } from './main'
import { setOnlineUsers, setSocket } from './redux/userSlice'

// Lazy load pages (Bundle size reduce hoga)
const Login = lazy(() => import('./pages/Login'))
const SignUp = lazy(() => import('./pages/SignUp'))
const Home = lazy(() => import('./pages/Home'))
const Profile = lazy(() => import('./pages/Profile'))

// Loading component
function LoadingSpinner() {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: '#f5f5f5',
      fontSize: '18px',
      fontFamily: 'sans-serif'
    }}>
      ⏳ Loading...
    </div>
  )
}

function App() {
  getCurrentUser()
  getOtherUsers()
  
  let { userData, socket, onlineUsers } = useSelector(state => state.user)
  let dispatch = useDispatch()

  // Socket.io connection
  useEffect(() => {
    if (userData) {
      const socketio = io(`${serverUrl}`, {
        query: {
          userId: userData?._id
        }
      })
      
      dispatch(setSocket(socketio))
      
      socketio.on("getOnlineUsers", (users) => {
        dispatch(setOnlineUsers(users))
      })
      
      return () => socketio.close()
      
    } else {
      if (socket) {
        socket.close()
        dispatch(setSocket(null))
      }
    }
  }, [userData])

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route path='/login' element={!userData ? <Login /> : <Navigate to="/" />} />
        <Route path='/signup' element={!userData ? <SignUp /> : <Navigate to="/profile" />} />
        <Route path='/' element={userData ? <Home /> : <Navigate to="/login" />} />
        <Route path='/profile' element={userData ? <Profile /> : <Navigate to="/signup" />} />
      </Routes>
    </Suspense>
  )
}

export default App