import React from 'react'

const WelcomePage = () => {
  return (
    <div>
      Welcome {sessionStorage.getItem('username')}
    </div>
  )
}

export default WelcomePage
