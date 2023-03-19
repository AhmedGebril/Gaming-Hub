import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function UpdatingMiddleware() {
  let navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // simulate loading time
    const timeoutId = setTimeout(() => {
      setIsLoading(false);
      navigate('/Account',{replace:true})
    }, 500);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <>
      {isLoading && (
        <div className="loading-screen1">
          <div className="loading-spinner1"></div>
          <p>Loading...</p>
        </div>
      )}
    </>
  );
}

export default UpdatingMiddleware;