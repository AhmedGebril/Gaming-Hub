import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';

export default function MainLoading({children}) {

    const [loading, setLoading] = useState(true);

    useEffect(() => {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 500); 
    },[]);

  return (

    <>
    {loading?<div className="loading-screen">
      <div className="spinner"></div>
      <p>Loading...</p>
    </div>:children}
    </>
  )
}
