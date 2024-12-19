import { Outlet, Navigate } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar/Navbar'
import { useUser } from '@clerk/clerk-react'

function App() {
  const {user,isLoaded,isSignedIn}=useUser();


  if(!isSignedIn&&isLoaded) 
    {
      return <Navigate to={'/auth'}/>
    }

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  )
}

export default App
