import React from 'react'
import { Card, Image, Typography } from 'antd'
import { useNavigate } from 'react-router-dom'

const { Meta } = Card

export default function CardPokemon({ numero, nombre }) {
  const navigate = useNavigate()
  const imageUrl = `https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/${numero}.png`

  return (
    <Card
      hoverable
      style={{
        width: 240,
        background: 'rgba(20,20,24,0.9)',
        border: '1px solid rgba(0,188,212,0.25)',
        backdropFilter: 'blur(10px)',
      }}
      cover={<Image alt={nombre} src={imageUrl} />}
      onClick={() => navigate(`/busqueda?pokemon=${encodeURIComponent(numero)}&criterio=${encodeURIComponent(1)}`)}
    >
      <Meta
        title={<Typography style={{ color: '#ccc' }}>{nombre}</Typography>}
        description={<Typography style={{ color: '#888' }}>número en la pokédex: {numero}</Typography>}
      />
    </Card>
  )
}
