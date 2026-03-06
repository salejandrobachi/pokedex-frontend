import React from 'react'
import { Card, Image, Typography } from 'antd'
import { useNavigate } from 'react-router-dom'

const { Meta } = Card

export default function CardRegion({ Nombre, Link }) {
  const navigate = useNavigate()

  return (
    <Card
      hoverable
      style={{
        width: 240,
        background: 'rgba(20,20,24,0.9)',
        border: '1px solid rgba(0,188,212,0.25)',
        backdropFilter: 'blur(10px)',
      }}
      cover={
        <div style={{ width: '240px', height: '160px', overflow: 'hidden' }}>
          <Image
            alt={Nombre}
            src={Link}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
      }
      onClick={() => navigate(`/regiones/nombre?nombre=${encodeURIComponent(Nombre)}`)}
    >
      <Meta title={<Typography style={{ color: '#ccc' }}>{Nombre}</Typography>} />
    </Card>
  )
}
