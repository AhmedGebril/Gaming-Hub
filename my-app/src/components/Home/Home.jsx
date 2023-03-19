import React from 'react'
import {  Outlet } from 'react-router-dom'
import { UserLogged } from '../Store/UserContextStore';
import Helmet from 'react-helmet'
import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';


export default function Home() {
    let navigate = useNavigate()
    let user = useContext(UserLogged)
    let username = user.name
    let token = localStorage.getItem('jwttoken')
        
    function NavigateFilter(e,value){
        e.preventDefault()
        navigate(`/home/Tags/${value}`,{state:{filter:value}})
    }

return (
    <>
    <Helmet>
        <title>Home</title>
    </Helmet>
    {token?<><h1 className='mb-3'>Welcome {user.name}</h1>
    <div className='mb-3'>
    <h3 className='mb-3 d-inline'>Related Tags : </h3>
    <NavLink className='bg-dark rounded-pill text-white  me-2 p-2 home-tags' onClick={(e)=>{NavigateFilter(e,e.target.textContent)}}>Shooter</NavLink>
    <NavLink className='bg-dark rounded-pill text-white  me-2 p-2 home-tags' onClick={(e)=>{NavigateFilter(e,e.target.textContent)}}>Action</NavLink>
    <NavLink className='bg-dark rounded-pill text-white  me-2 p-2 home-tags' onClick={(e)=>{NavigateFilter(e,e.target.textContent)}}>RPG</NavLink>
    <NavLink className='bg-dark rounded-pill text-white  me-2 p-2 home-tags' onClick={(e)=>{NavigateFilter(e,e.target.textContent)}}>Puzzle</NavLink>
    <span className='remove-tags text-white' onClick={()=>{navigate('/home')}}>Remove Tags</span>
    </div></>:''}
   
    <Outlet></Outlet>
    </>
)
}
