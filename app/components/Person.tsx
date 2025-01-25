import React from 'react'

interface Props {
    first_name: string
    last_name: string
    avatar: string
    email:string
}

const Person: React.FC<Props> = ({first_name, last_name, email, avatar}) => {
  return (
    <div>
      <div><img key={avatar} src={avatar} /></div>
      <div>{email}</div>
      <div>{first_name}</div>
      <div>{last_name}</div>
    
      
    </div>
  )
}

export default Person
