import React from 'react'
import { Menu, Button } from 'antd'
import { LeftOutlined } from '@ant-design/icons'
import { useNavigate, useLocation } from 'react-router-dom'

const navItems = [
  { label: 'Inicio', key: 'home' },
  { label: 'Región', key: 'region' },
  { label: 'Tipos', key: 'type' },
  { label: 'Resistencias', key: 'resistencia' },
  { label: 'Debilidades', key: 'debilidad' },
  { label: 'Inmunidad', key: 'inmunidad' },
]

const routeMap = {
  home: '/',
  region: '/regiones',
  type: '/tipos',
  resistencia: '/resistencias',
  debilidad: '/debilidades',
  inmunidad: '/inmunidades',
}

const pathToKey = {
  '/': 'home',
  '/regiones': 'region',
  '/tipos': 'type',
  '/resistencias': 'resistencia',
  '/debilidades': 'debilidad',
  '/inmunidades': 'inmunidad',
  '/busqueda': 'home',
  '/regiones/nombre': 'region',
}

const backPaths = ['/busqueda', '/regiones/nombre']

function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()
  const currentKey = pathToKey[location.pathname] || 'home'
  const showBack = backPaths.includes(location.pathname)

  return (
    <div style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
      {showBack && (
        <Button
          icon={<LeftOutlined />}
          onClick={() => navigate(-1)}
          style={{
            position: 'absolute',
            left: '12px',
            color: '#00bcd4',
            borderColor: 'rgba(0,188,212,0.4)',
            background: 'transparent',
            zIndex: 1,
          }}
        >
          Volver
        </Button>
      )}
      <Menu
        mode='horizontal'
        items={navItems}
        onClick={e => navigate(routeMap[e.key])}
        selectedKeys={[currentKey]}
        style={{ flex: 1, justifyContent: 'center' }}
      />
    </div>
  )
}

export default Navbar
