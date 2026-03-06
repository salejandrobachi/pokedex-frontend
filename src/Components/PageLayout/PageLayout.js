import React from 'react'
import { Typography } from 'antd'
import Navbar from '../Navbar/Navbar'
import './PageLayout.css'

function PageLayout({ title, children }) {
  return (
    <div
      className='page-root'
      style={{
        backgroundImage: 'url(/fondo.png)',
        backgroundRepeat: 'repeat',
        backgroundSize: '150px',
      }}
    >
      <div className='page-content'>
        <div className='page-navbar-card'>
          <Navbar />
        </div>
        {title && (
          <div className='page-title-card'>
            <Typography.Title level={2} style={{ color: '#ccc', margin: 0 }}>
              {title}
            </Typography.Title>
          </div>
        )}
        {children}
      </div>
    </div>
  )
}

export default PageLayout
