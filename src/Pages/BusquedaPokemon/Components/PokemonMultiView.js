import React from 'react'
import { Image, Flex } from 'antd'
import CardPokemon from './CardPokemon'

const cardStyle = {
  background: 'rgba(20,20,24,0.9)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(0,188,212,0.25)',
  borderRadius: '8px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '24px',
}

export default function PokemonMultiView({ data, loading }) {
  if (loading) {
    return (
      <div style={cardStyle}>
        <Image
          width={300}
          src='https://cdn.dribbble.com/users/621155/screenshots/2835314/simple_pokeball.gif'
          preview={false}
        />
      </div>
    )
  }

  if (!data || !Array.isArray(data) || data.length === 0) {
    return (
      <div style={cardStyle}>
        <Image width={300} src='https://i.giphy.com/UHAYP0FxJOmFBuOiC2.webp' preview={false} />
      </div>
    )
  }

  return (
    <div style={cardStyle}>
      <Flex gap='middle' wrap justify='center'>
        {data.map(p => (
          <CardPokemon key={p.numero} numero={p.numero} nombre={p.nombre} />
        ))}
      </Flex>
    </div>
  )
}
