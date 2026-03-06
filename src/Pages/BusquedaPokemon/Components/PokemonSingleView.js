import React from 'react'
import { Image, Flex } from 'antd'

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

export default function PokemonSingleView({ data, loading }) {
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

  if (!data || !data.nombre) {
    return (
      <div style={cardStyle}>
        <Image width={300} src='https://i.giphy.com/UHAYP0FxJOmFBuOiC2.webp' preview={false} />
      </div>
    )
  }

  return (
    <div style={cardStyle}>
      <Flex gap='middle' wrap={false} justify='flex-start' align='flex-start'>
        <Image
          width={300}
          style={{ marginLeft: '-100px' }}
          preview={false}
          src={`https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/${data.numero}.png`}
        />
        <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '24px' }}>
          <p style={{ color: '#ccc', marginTop: '0', fontSize: '3em', fontWeight: 'bold', marginBottom: '16px' }}>
            Datos del Pokémon:
          </p>
          <p style={{ color: '#ccc', marginTop: '0', fontSize: '1.2em', marginBottom: '8px' }}>
            <strong>Nombre del Pokémon:</strong> {data.nombre}
          </p>
          <p style={{ color: '#ccc', marginTop: '0', fontSize: '1.2em', marginBottom: '8px' }}>
            <strong>Número de Pokédex:</strong> {data.numero}
          </p>
          <p style={{ color: '#ccc', marginTop: '0', fontSize: '1.2em', marginBottom: '8px' }}>
            <strong>Región:</strong> {data.region}
          </p>
          <p style={{ color: '#ccc', marginTop: '0', fontSize: '1.2em', marginBottom: '8px' }}>
            <strong>Tipo:</strong> {data.tipo_1} {data.tipo_2}
          </p>
          <p style={{ color: '#ccc', marginTop: '0', fontSize: '1.2em', marginBottom: '8px' }}>
            <strong>Debilidades:</strong> {data.debilidad_1} {data.debilidad_2} {data.debilidad_3} {data.debilidad_4} {data.debilidad_5} {data.debilidad_6} {data.debilidad_7}
          </p>
        </div>
      </Flex>
    </div>
  )
}
