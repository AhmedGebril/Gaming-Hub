import React from 'react'
import { Outlet,Link,NavLink,useNavigate } from 'react-router-dom'
import { UserLogged } from '../Store/UserContextStore'
import {useContext,useState  } from 'react'
import { useRef } from 'react'
import { Power3 } from "gsap/gsap-core";
import { gsap} from "gsap";
import { useLayoutEffect } from 'react'



export default function Layout() {
  let user = useContext(UserLogged)
  const errorMessage = useRef()
  const [search,SetSearch] = useState()
  let navigate = useNavigate()

  function close(){
    const CloseMessage = document.getElementById('alert-message')
    gsap.to(errorMessage.current,.4,{ease:Power3.easeOut,x:100,opacity:0}).then(()=>CloseMessage.remove())
  }
  useLayoutEffect(()=>{
    gsap.from(errorMessage.current,.8,{ease:Power3.easeOut,y:-100,opacity:0})
  },[])

  function GetSearch(e){
    e.preventDefault()
    navigate({pathname:'/searchTags',search:`?search=${search}`})
  }
  function SignOut(){
    localStorage.removeItem('jwttoken')
    navigate('/')
  }


  return (
    <>
<nav className="navbar navbar-expand-lg bg-body-tertiary mb-5 bg-dark navbar-dark">
  <div className="container-fluid">
    <Link  className='navbar-brand' to='/'>GamesDB</Link>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav mx-auto mb-2 mb-lg-0 list-unstyled">
        <NavLink className="nav-link" to="/home" style={{textDecoration: 'none' }}>
        Home
        </NavLink>
        <NavLink className="nav-link" style={{textDecoration: 'none' }} to="/home">
        Main Page
        </NavLink>
        {localStorage.getItem('jwttoken')?<><NavLink className="nav-link" style={{textDecoration: 'none' }} onClick={()=>{SignOut()}}>
        Log out
        </NavLink><NavLink className="nav-link" style={{textDecoration: 'none' }} to="/Account">
        Account
        </NavLink></> :<><NavLink className="nav-link" style={{textDecoration: 'none' }} to="Signin">
        Sign in
        </NavLink>
        <NavLink className="nav-link" style={{textDecoration: 'none' }} to="Register">
        Register
        </NavLink></>}
        

    </ul>
    <form className="d-flex" role="search" onSubmit={(e)=>{GetSearch(e)}}>
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" onChange={(e)=>{SetSearch(e.target.value)}}></input>
        <button className="btn btn-outline-success" type="submit">Search</button>
    </form>
    </div>
</div>
</nav>
<div className='container vh-100 position-relative'>
  {localStorage.getItem('jwttoken')?<Outlet></Outlet>:<div className="alert alert-danger" id="alert-message" ref={errorMessage}>
        Please Log in to view content
        </div>}
</div>
</>
  )
}
