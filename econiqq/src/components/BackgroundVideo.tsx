import React from 'react'

const BackgroundVideo = () => {
  return (
    <>
      <video autoPlay muted loop preload="auto" id="video-bg">
        <source src="/assets/videos/bg.mp4" type="video/mp4"></source>
      </video>
    </>
  )
}

export default BackgroundVideo
