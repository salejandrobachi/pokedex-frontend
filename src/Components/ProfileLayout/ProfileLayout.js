import React from 'react'
import { Flex, Menu } from 'antd'
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
      <Flex gap={16} align='flex-start'>
        {isAdmin && (
          <Menu
            mode='inline'
            items={sidebarItems}
            selectedKeys={[location.pathname]}
            onClick={({ key }) => navigate(key)}
            className='profile-sidebar-menu'
            style={{ width: 160, flexShrink: 0, borderRadius: 12 }}
          />
        )}
        <div style={{ flex: 1, minWidth: 0 }}>
          {children}
        </div>
      </Flex>
    </PageLayout>
  )
}

export default ProfileLayout
