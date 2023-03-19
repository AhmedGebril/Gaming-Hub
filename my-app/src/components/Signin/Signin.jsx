import React from 'react'
import { UserLogged } from '../Store/UserContextStore'
import { useContext } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import axios from 'axios'

 



export default function Signin() {
  let user = useContext(UserLogged)
  const [error,setError]=useState()
  let navigate = useNavigate()


  async function LogIn(e){
    e.preventDefault()
    let Email = document.getElementById('email').value
    let Password = document.getElementById('password').value
    await axios.post('http://localhost:3001/login',{Email,Password},{ withCredentials: true }).then(res=>{
      if (res.status == 201) {
        user.isLoggedin(true)
        user.setName(res.data.payload.username)
        localStorage.setItem('jwttoken',res.data.token)
        navigate('/home',{replace:true})
      }else{
        setError('invalid email or password')
      }
    }).catch(err=>{
      setError(err.message)
    })
}

  return (
    <>
    <Helmet>
    <title>Log in</title>
  </Helmet>
    <div className="container vh-100 d-flex flex-column justify-content-center align-items-center">
          <div className=''>
          <div className='text-white mb-2 signin-back' onClick={()=>{navigate(-1)}}>
           <i className="fa-sharp fa-solid fa-angles-left me-2"></i>
           <p className='text-white d-inline'>Go Back</p>
          </div>
          <h2 className="mb-3">Log in</h2>
          </div>
          <form className='form-control  p-3'  onSubmit={(e)=>{LogIn(e)}}> 
            {error?<div className='alert alert-danger'>{error}</div>:''}
            <label htmlFor='email' className="mb-2 text-black">Enter Your Email</label>
            <input type="text" placeholder='Enter Email' id="email" className='form-control mb-4 '></input>
            <label htmlFor='password' className="mb-2 text-black">Enter Your password</label>
            <input type="text" placeholder='Enter Password' id="password" className='form-control mb-4'></input>
            <button className='btn btn-success d-block mb-2'>Login</button>
            <span className='text-muted already' onClick={()=>{navigate('/Register')}} style={{cursor:'pointer'}}>Don't have an account?</span>
          </form>
        </div>
        </>
  )
}
