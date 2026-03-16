import React, { useState } from 'react'
import { Form, Input, Button, Alert } from 'antd'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { useAuth } from '../../Context/AuthContext'
import { loginUser } from '../../services/auth.service'

const cardStyle = {
  background: 'rgba(20,20,24,0.9)',
  border: '1px solid rgba(0,188,212,0.25)',
  borderRadius: '12px',
  padding: '36px 32px',
  width: '100%',
  maxWidth: '400px',
}

const submitBtnStyle = {
  width: '100%',
  background: 'transparent',
  borderColor: 'rgba(0,188,212,0.4)',
  color: '#00bcd4',
  height: 38,
}

const labelStyle = { color: '#aaa', fontSize: 13 }

function LoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from || '/'
  const { login } = useAuth()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  async function handleSubmit(values) {
    setLoading(true)
    setError(null)
    try {
      const data = await loginUser({ login: values.login, password: values.password })
      login(data.token, data.user)
      navigate(from, { replace: true })
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundImage: 'url(/fondo.png)',
        backgroundRepeat: 'repeat',
        backgroundSize: '150px',
        position: 'relative',
      }}
    >
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(15,15,18,0.82)' }} />

      <div style={{ position: 'absolute', top: 20, left: 24, zIndex: 2 }}>
        <Link
          to='/'
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            color: '#00bcd4',
            fontSize: 14,
            background: 'rgba(20,20,24,0.85)',
            border: '1px solid rgba(0,188,212,0.25)',
            borderRadius: 8,
            padding: '6px 14px',
            textDecoration: 'none',
          }}
        >
          ← Inicio
        </Link>
      </div>

      <div style={{ position: 'relative', zIndex: 1, ...cardStyle }}>
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <img src='/titulo.png' alt='Pokédex' style={{ maxWidth: '300px', width: '100%' }} />
        </div>

        {error && <Alert message={error} type='error' showIcon style={{ marginBottom: 16 }} />}

        <Form layout='vertical' onFinish={handleSubmit}>
          <Form.Item
            label={<span style={labelStyle}>Usuario o email</span>}
            name='login'
            rules={[{ required: true, message: 'Ingresa tu usuario o email' }]}
          >
            <Input className='login-input' />
          </Form.Item>
          <Form.Item
            label={<span style={labelStyle}>Contraseña</span>}
            name='password'
            rules={[{ required: true, message: 'Ingresa tu contraseña' }]}
          >
            <Input.Password className='login-input' />
          </Form.Item>
          <Form.Item style={{ marginBottom: 12, marginTop: 8 }}>
            <Button htmlType='submit' loading={loading} style={submitBtnStyle}>
              Iniciar sesión
            </Button>
          </Form.Item>
        </Form>

        <div style={{ textAlign: 'center' }}>
          <span style={{ color: '#666', fontSize: 13 }}>¿No tenés cuenta? </span>
          <Link to='/register' style={{ color: '#00bcd4', fontSize: 13 }}>Registrarse</Link>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
