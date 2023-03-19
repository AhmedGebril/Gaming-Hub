import React from 'react'
import { Navigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

export default function Tags() {
    let location = useLocation()
    let filter=location.state.filter
  return (
    <Navigate to={`/home/Utags/${filter}`} state={filter}  replace={true}/>
  )
}
