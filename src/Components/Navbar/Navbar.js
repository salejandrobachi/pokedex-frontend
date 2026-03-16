import React from 'react'
import { Menu, Button, Dropdown } from 'antd'
import { LeftOutlined, UserOutlined, LogoutOutlined } from '@ant-design/icons'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../Context/AuthContext'

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

const ghostBtn = {
  color: '#00bcd4',
  borderColor: 'rgba(0,188,212,0.4)',
  background: 'transparent',
}

const avatarStyle = {
  width: 32,
  height: 32,
  borderRadius: '50%',
  background: 'rgba(0,188,212,0.15)',
  border: '1px solid rgba(0,188,212,0.5)',
  color: '#00bcd4',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontWeight: 700,
  fontSize: 14,
  cursor: 'pointer',
  userSelect: 'none',
  title: '',
}

function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()
  const { isAuthenticated, user, logout } = useAuth()
  const currentKey = pathToKey[location.pathname] || 'home'
  const showBack = backPaths.includes(location.pathname)

  return (
    <div style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
      {showBack && (
        <Button
          icon={<LeftOutlined />}
          onClick={() => navigate(-1)}
          style={{ position: 'absolute', left: '12px', zIndex: 1, ...ghostBtn }}
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

      <div style={{ position: 'absolute', right: '12px', display: 'flex', alignItems: 'center', gap: 8 }}>
        {isAuthenticated ? (
          <Dropdown
            trigger={['hover']}
            menu={{
              items: [
                {
                  key: 'profile',
                  icon: <UserOutlined />,
                  label: 'Perfil',
                  onClick: () => navigate('/profile'),
                },
                {
                  key: 'logout',
                  icon: <LogoutOutlined />,
                  label: 'Cerrar sesión',
                  onClick: logout,
                  danger: true,
                },
              ],
            }}
          >
            <div
              style={avatarStyle}
              onClick={() => navigate('/profile')}
              title={user?.username}
            >
              {user?.username?.[0]?.toUpperCase()}
            </div>
          </Dropdown>
        ) : (
          <Button style={ghostBtn} icon={<UserOutlined />} onClick={() => navigate('/login')}>
            Iniciar sesión
          </Button>
        )}
      </div>
    </div>
  )
}

export default Navbar
