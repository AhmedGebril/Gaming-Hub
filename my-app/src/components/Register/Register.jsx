import React from 'react'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserLogged } from '../Store/UserContextStore'
import { Helmet } from 'react-helmet'
import { useState } from 'react'
import { useRef } from 'react'
import { Power3 } from "gsap/gsap-core";
import { gsap} from "gsap";
import axios from 'axios'


export default function Register() {
  let navigate = useNavigate()
  let user = useContext(UserLogged)
  const [isChecked, setIsChecked]=useState(false)
  const [error, setError] = useState(null);
  const errorMessage = useRef()

  async function setUser(e){
    e.preventDefault()
    if (!isChecked) {
      setError('You must accept the terms and conditions');
    } else {
      setError(null);
      const username = document.getElementById("name").value;
      const email = document.getElementById("Email").value;
      const password = document.getElementById("password").value;
      await axios.post('http://localhost:3001/register', {username, email, password}).then((res)=>{
        if(res.status==201){
          navigate('/Signin',{replace:true})
          console.log(res.status)
        }else{
          console.log(res.status)
          setError(res.data)
        }
      }).catch((err)=>{
        setError(err.response);
      })
  }
  }

  function close(){
    gsap.to(errorMessage.current,.4,{ease:Power3.easeOut,opacity:0}).then(()=>setError())
  }


  return (
    <>
    <Helmet>
      <title>Register</title>
    </Helmet>
    <div className="container vh-100 d-flex flex-column justify-content-center align-items-center">
          <div>
          <h2 className="mb-3">Register</h2>
          </div>
          <form className='form-control  p-4'  onSubmit={(e)=>{setUser(e)}}>
            {error?<div className='alert alert-danger' ref={errorMessage}>{error}<i className="fa-solid fa-xmark close-icon" onClick={()=>{close()}}></i></div>:''} 
            <label htmlFor='name' className="mb-2 text-black">Enter Your username</label>
            <input type="text" placeholder='Enter username' id="name" className='form-control mb-4 '></input>
            <label htmlFor='Email' className="mb-2 text-black">Enter Your Email</label>
            <input type="text" placeholder='Enter Email' id="Email" className='form-control mb-4 '></input>
            <label htmlFor='password' className="mb-2 text-black">Enter Your password</label>
            <input type="text" placeholder='Enter Password' id="password" className='form-control mb-4'></input>
            <label>
              <input type="checkbox" checked={isChecked} onChange={() => setIsChecked(!isChecked)} className="me-2"/>
              I accept the terms and conditions
            </label>
            <button className='btn btn-success d-block mb-2'>Register</button>
            <span className='text-muted already' onClick={()=>{navigate('/Signin',{replace:true})}} style={{cursor:'pointer'}}>Already have an account?</span>
          </form>
        </div>
        </>
  )
}
