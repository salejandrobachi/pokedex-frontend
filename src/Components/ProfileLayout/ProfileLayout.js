import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { UserOutlined, TeamOutlined } from '@ant-design/icons'
import { useAuth } from '../../Context/AuthContext'
import PageLayout from '../PageLayout/PageLayout'

const sidebarItems = [
  { key: '/profile', label: 'Perfil', icon: <UserOutlined /> },
  { key: '/admin', label: 'Usuarios', icon: <TeamOutlined /> },
]

function ProfileLayout({ title, children }) {
  const { user } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const isAdmin = user?.role === 'admin'

  return (
    <PageLayout title={title}>
      <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
        {isAdmin && (
          <nav style={{
            background: 'rgba(20,20,24,0.9)',
            border: '1px solid rgba(0,188,212,0.25)',
            borderRadius: '12px',
            padding: '8px',
            minWidth: 160,
            flexShrink: 0,
          }}>
            {sidebarItems.map(item => {
              const active = location.pathname === item.key
              return (
                <div
                  key={item.key}
                  onClick={() => navigate(item.key)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    padding: '10px 14px',
                    borderRadius: 8,
                    cursor: 'pointer',
                    color: active ? '#00bcd4' : '#888',
                    background: active ? 'rgba(0,188,212,0.1)' : 'transparent',
                    borderLeft: active ? '2px solid #00bcd4' : '2px solid transparent',
                    fontSize: 14,
                    transition: 'all 0.15s',
                    userSelect: 'none',
                  }}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </div>
              )
            })}
          </nav>
        )}

        <div style={{ flex: 1, minWidth: 0 }}>
          {children}
        </div>
      </div>
    </PageLayout>
  )
}

export default ProfileLayout
