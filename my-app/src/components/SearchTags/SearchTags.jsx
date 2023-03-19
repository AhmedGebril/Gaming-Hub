import React, { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

export default function SearchTags() {
    let navigate = useNavigate()
    const [search,setSearch]=useSearchParams()


    useEffect(()=>{
        navigate({pathname:'/search',search:`?search=${search.get('search')}`})
    })


  return (
    <></>
  )
}
