import React, { useState } from 'react'
import {signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase-config';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Login = ({onLoginSuccess}) => {
    const [inputPassword,setInputPassword]=useState('');
    const [inputEmail,setInputEmail]=useState('');
    

    const handleSubmit=async (e)=> {
        e.preventDefault()
      
      try {
        const cred= await signInWithEmailAndPassword(auth,inputEmail,inputPassword)
         console.log("login successully", cred)
         toast.success("Login successful", {
          position: "top-center",
          autoClose: 3000,
      });
         onLoginSuccess();
         
      } catch (error) {
        console.log("error in signing in");
        toast.error("Login failed: " + error.message, {
          position: "top-center",
          autoClose: 3000,
      })
      }
        
    }
  return (
   
   <form className='space-y-4' onSubmit={handleSubmit}>
   <h2 className='text-lg font-bold'> Admin Login</h2>
    <label className='block text-sm font-medium mb-1'> Enter Email</label>
    <input className='w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300'
    type='email' onChange={(e)=> setInputEmail(e.target.value)} required/> 
    <label className='block text-sm font-medium mb-1'> Enter Password</label>
    <input className='w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300'
    type='password' onChange={(e)=> setInputPassword(e.target.value)}  required/> 
    <input    className="bg-blue-500 text-white px-4 py-2 rounded w-full"
    type='submit'/>
   </form>
  )
}

export default Login
