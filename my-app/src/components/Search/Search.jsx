import React, { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default function Search() {
    const[search,SetSearchParams] = useSearchParams()
    const[data,setData]=useState([])
    const[loaded,setLoading] = useState(false)

    async function getFilterdData(){
      let data = await axios.get('https://api.rawg.io/api/games?key=ebd97901b6ca451482a89a2881456f4f')
      data = data.data.results
      let keepers = []
      data.forEach(game => {
        if(game.name.toLowerCase().includes(search.get('search').toLowerCase())){
            keepers.push(game)           
        }
      })
      setData(keepers)
  }
  useEffect(()=>{
    setLoading(true);
    getFilterdData()
    setTimeout(() => {
    setLoading(false);
    }, 500)
},[])   

  return (
    <>
    <h1 className='text-white mb-3'>Search Results for  <span className='active diff'>{search.get('search')}</span> :</h1>
    {loaded?<div className='h-100 d-flex justify-content-center align-items-center'>
        <div className='loading'>
            <h2 className=''>Loading assets...</h2>
        </div>
        </div>:
        <div className='row g-4'>
        {data.map((game,index)=>(
        <div className='col-md-4' key={index}>
            <Link to={"/GameDetails/"+game.id}>
            <div className="card text-bg-dark">
                <img src={game.short_screenshots[0].image} className="card-img" alt="..."></img>
            <div className="card-img-overlay">
            <h5 className="card-title">{game.name}</h5>
            <p className="card-text ratings"><small>{game.rating}</small></p>
        </div>
        </div>
        </Link>
            </div>
            
        ))}
    </div>}
    </>
  )
}
