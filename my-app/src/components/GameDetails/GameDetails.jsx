import React from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import { useEffect,useState } from 'react'
import { Helmet } from 'react-helmet'
import { useNavigate } from 'react-router-dom'
import { UserLogged } from '../Store/UserContextStore'
import { useContext } from 'react'

export default function GameDetails() {
  const user = useContext(UserLogged)
  let navigate = useNavigate()
  let {id} = useParams()
  const [game,setGame]=useState()
  const [trailers,setTrailers]=useState()
  const src = trailers


  async function GetGameDetails(id){
    let data = await axios.get(`https://api.rawg.io/api/games/${id}?key=ebd97901b6ca451482a89a2881456f4f`)
    setGame(data.data)
  }
  async function GetGameTrailers(id){
    try{
      let data = await axios.get(`https://api.rawg.io/api/games/${id}/movies?key=ebd97901b6ca451482a89a2881456f4f`)
      setTrailers(data.data.results[0].data.max)
    }catch(err){
      console.log(err)
    }
  }

  function postComment(e){
    e.preventDefault()
    const comment = document.getElementById('comment').value
    const username = user.name
    axios.post('http://localhost:3001/comment',{username,comment})
    .then(response =>{
      console.log(response.data)
      response.json()
    })
    .catch((err) => console.log(err))
  }


  useEffect(()=>{
    GetGameDetails(id)
    GetGameTrailers(id)
  },[])


  return (
    <>
    <Helmet>
      <title>Game detail</title>
    </Helmet>
    <div className='text-white mb-2 back' onClick={()=>{navigate(-1)}}>
      <i className="fa-sharp fa-solid fa-angles-left"></i>
    </div>
    {game?
      <div className='row g-4'>
        <div className='col-md-4'>
          <div className='card rounded overflow-hidden shadow mb-3'>
          <img src={game.background_image} className="w-100 h-100"></img>
          <div  className='p-2'>
            <h5 className='text-dark'>{game.name}</h5>
          </div>
          </div>
          <p className='text-muted mb-3'>Where To buy </p>
          <div className='row g-3'>
            {game.stores.map((store,k)=>(
              <div className='col-md-5' key={k}>
                <Link to={{ pathname: "//"+store.store.domain }} target="_blank" className='nav-link'>
                <div className=' shadow rounded bg-dark text-center'>
                  <p className='text-white'>{store.store.name}</p>
                </div>
                </Link>
              </div>
            ))}
            <p className='text-muted '>Genres</p>
            <div className='row g-2'>
              {game.genres.map((genre,k)=>{
                return(
                  <div className='col-md-5' key={k}>
                    <div className=' shadow rounded bg-dark text-center'>
                      <p className='text-white'>{genre.name}</p>
                    </div>
                  </div>
                )
              })}
            </div>
            <p className='text-muted '>Platform</p>
            <div className='row g-2'>
              {game.parent_platforms.map((Platform,k)=>{
                return(
                  <div className='col-md-5' key={k}>
                    <div className=' shadow rounded bg-dark text-center'>
                      <p className='text-white'>{Platform.platform.name}</p>
                    </div>
                  </div>
                )
              })}
            </div>
            <p className='text-muted '>Developers</p>
            <div className='row g-2'>
              {game.developers.map((Developer,k)=>{
                return(
                  <div className='col-md-5' key={k}>
                    <div className=' shadow rounded bg-dark text-center'>
                      <p className='text-white'>{Developer.name}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>         
        </div>
        <div className='col-md-6'>
          <h3>released : {game.released}</h3>
          <h3>rating : {game.rating}</h3>
          <p className='mb-5'><span className='description'>Description  </span>{game.description_raw}</p>
          <h5>Tags</h5>
            <div className='tags mb-3'>
            {game.tags.map((tag,index) =>
              <span className="me-2 game-tags text-white" key={index}>{tag.name},</span>
              )}
            </div>
            {trailers? <div className='trailer mb-4'> 
            <h5 className='mb-3'>Trailers</h5>
            <video controls width="100%">
              <source src={src} type="video/mp4" />
                Sorry, your browser doesn't support embedded videos.
            </video>
            </div>:''}  
        </div>
      </div>
      :<div>GameDetails {id}</div>}
    </>
  )
}
