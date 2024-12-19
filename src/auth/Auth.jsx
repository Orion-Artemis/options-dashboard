import React from 'react'
import { SignIn } from "@clerk/clerk-react";

const Auth = () => {
  return (
    <div className='flex justify-center items-center w-full h-screen'>
      <SignIn />
    </div>
  )
}

export default Auth