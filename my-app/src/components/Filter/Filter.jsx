import React from 'react'
import {  useParams,Link } from 'react-router-dom'
import { useState,useEffect } from 'react'
import axios from 'axios'

export default function Filter() {
    let {filter} = useParams()
    const[data,setData]=useState([])
    const [loaded,setLoading]=useState(false)
    const[tag,setTag]=useState(filter)
 
    async function getFilterdData(value){
        let data = await axios.get('https://api.rawg.io/api/games?key=ebd97901b6ca451482a89a2881456f4f')
        data = data.data.results
        let keepers = []
        data.forEach(element => {
            element.genres.forEach(genre=>{
                if(genre.name.includes(tag)){
                    keepers.push(element)
                }
            })
        })
        setData(keepers)
    }

useEffect(()=>{
    setLoading(true);
    getFilterdData(filter)
    setTimeout(() => {
    setLoading(false);
    }, 500)
},[])   

return (
    <>
    <h3>Currently viewing <span className='active diff'>{filter}</span> games</h3>
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
                <img src={game.short_screenshots[0].image} className="card-img" alt="..." style={{height:'15rem',width:'26rem'}}></img>
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
