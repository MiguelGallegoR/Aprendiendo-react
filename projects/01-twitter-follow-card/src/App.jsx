import React from 'react'
import './App.css'
import { TwitterFollowCard } from './TwitterFollowCard.jsx'

const users = [
  {
    userName: 'midudev',
    name: 'Miguel Ángel Durán',
    isFollowing: true,
    avatar: 'midudev'
  },
  {
    userName: 'miguelgallegorodriguez',
    name: 'Miguel Gallego Rodríguez',
    isFollowing: true,
    avatar: 'linkedin'

  },
  {
    userName: 'MiguelGallegoR',
    name: 'MiguelGallegoR',
    isFollowing: false,
    avatar: 'github'

  },
  {
    userName: 'Eminem',
    name: 'Marshall Mathers',
    isFollowing: false,
    avatar: 'Eminem'

  }
]

export function App () {
  return (
    <section className='App'>
      {
        users.map(({ userName, name, isFollowing, avatar }) => (
          <TwitterFollowCard key={userName} userName={userName} initialIsFollowing={isFollowing} avatar={avatar}>
            {name}
          </TwitterFollowCard>
        ))
      }

    </section>
  )
}
