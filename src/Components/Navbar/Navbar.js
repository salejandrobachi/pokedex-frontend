import React from 'react'
import { Menu, Button, Dropdown, Flex, Avatar } from 'antd'
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
const homePaths = ['/profile', '/admin']

const ghostBtn = {
  color: '#00bcd4',
  borderColor: 'rgba(0,188,212,0.4)',
  background: 'transparent',
}

function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()
  const { isAuthenticated, user, logout } = useAuth()
  const currentKey = pathToKey[location.pathname] || 'home'
  const showBack = backPaths.includes(location.pathname)
  const showHome = homePaths.includes(location.pathname)

  return (
    <Flex align='center' style={{ position: 'relative' }}>
      {showBack && (
        <Button
          icon={<LeftOutlined />}
          onClick={() => navigate(-1)}
          style={{ position: 'absolute', left: 12, zIndex: 1, ...ghostBtn }}
        >
          Volver
        </Button>
      )}
      {showHome && (
        <Button
          icon={<LeftOutlined />}
          onClick={() => navigate('/')}
          style={{ position: 'absolute', left: 12, zIndex: 1, ...ghostBtn }}
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

      <Flex align='center' gap={8} style={{ position: 'absolute', right: 12 }}>
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
            <Avatar
              style={{
                background: 'rgba(0,188,212,0.15)',
                border: '1px solid rgba(0,188,212,0.5)',
                color: '#00bcd4',
                fontWeight: 700,
                cursor: 'pointer',
              }}
              onClick={() => navigate('/profile')}
              title={user?.username}
            >
              {user?.username?.[0]?.toUpperCase()}
            </Avatar>
          </Dropdown>
        ) : (
          <Button style={ghostBtn} icon={<UserOutlined />} onClick={() => navigate('/login')}>
            Iniciar sesión
          </Button>
        )}
      </Flex>
    </Flex>
  )
}

export default Navbar
