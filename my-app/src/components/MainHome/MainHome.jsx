import React from 'react'
import { useEffect,useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import LoadingScreen from '../Loading/Loading'


export default function MainHome() {
    const[data,setData]=useState([])
    const [loaded,setLoading]=useState(false)

    async function  GetData(){
        let data = await axios.get(`https://api.rawg.io/api/games?key=ebd97901b6ca451482a89a2881456f4f`)
        setData(data.data.results)
    }

    useEffect(()=>{
    setLoading(true);
    GetData()
    setTimeout(() => {
    setLoading(false);
    },500)
    },[])


  return (
    <>
    <h3>currently viewing all <span className='diff'>games</span></h3>
    {loaded?<LoadingScreen/>:
        <div className='row g-4 pb-3'>
        {data.map((game,index)=>(
            <div className='col-md-4' key={index}>
        <Link to={"/GameDetails/" + game.id}>
        <div className="card text-bg-dark">
                <img src={game.short_screenshots[0].image} className="card-img" alt="..." style={{height:'15rem',width:'26rem'}}></img>
            <div className="card-img-overlay">
            <h5 className="card-title ">{game.name}</h5>
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
