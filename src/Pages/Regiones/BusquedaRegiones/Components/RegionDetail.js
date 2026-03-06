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

export default function RegionDetail({ data, loading }) {
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

  const region = data && data[0]

  if (!region || !region.nombre) {
    return (
      <div style={cardStyle}>
        <Image width={300} src='https://i.giphy.com/UHAYP0FxJOmFBuOiC2.webp' preview={false} />
      </div>
    )
  }

  return (
    <div style={cardStyle}>
      <Flex gap='middle' wrap={false} justify='flex-start' align='flex-start'>
        <Image width={300} style={{ marginLeft: '-100px' }} src={region.Linkimage} preview={false} />
        <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '24px' }}>
          <p style={{ color: '#ccc', marginTop: '0', fontSize: '3em', fontWeight: 'bold', marginBottom: '16px' }}>
            Datos de la Región:
          </p>
          <p style={{ color: '#ccc', marginTop: '0', fontSize: '1.2em', marginBottom: '8px' }}>
            <strong>Nombre de la Región:</strong> {region.nombre}
          </p>
          <p style={{ color: '#ccc', marginTop: '0', fontSize: '1.2em', marginBottom: '8px' }}>
            <strong>Generacion:</strong> {region.generacion}
          </p>
          <p style={{ color: '#ccc', marginTop: '0', fontSize: '1.2em', marginBottom: '8px' }}>
            <strong>Caracteristica:</strong> {region.caracteristica}
          </p>
        </div>
      </Flex>
    </div>
  )
}
