import React, { useState, useEffect } from 'react';

function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // simulate loading time
    const timeoutId = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

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
      {!isLoading && <p>Game is ready!</p>}
    </>
  );
}

export default LoadingScreen;