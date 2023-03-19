import { UserLogged } from '../Store/UserContextStore'
import { useContext } from 'react'
import { useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function RequireAuth({children}) {
  let navigate = useNavigate()
  let user = useContext(UserLogged)
  const location = useLocation()
  const token = localStorage.getItem('jwttoken')
  const [authenticated, setAuthenticated] = useState(false)

  async function Auth(){
    await axios.post('http://localhost:3001/Auth',{jwttoken:token}).then(res=>{
      setAuthenticated(true)
    }).catch(err=>{
      console.log(err.message)
      localStorage.removeItem('jwttoken')
      navigate({pathname:'/Signin',replace:true})
    })
  }

  useEffect(()=>{
    Auth()
  }, [location])

  return (
    authenticated && children
  )
}