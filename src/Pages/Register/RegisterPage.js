import React, { useState } from 'react'
import { Form, Input, Button, Alert, Typography, Flex } from 'antd'
import { LeftOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../Context/AuthContext'
import { registerUser, loginUser } from '../../services/auth.service'

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

function RegisterPage() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState([])

  async function handleSubmit(values) {
    setLoading(true)
    setErrors([])
    try {
      await registerUser({ username: values.username, email: values.email, password: values.password })
      const data = await loginUser({ login: values.email, password: values.password })
      login(data.token, data.user)
      navigate('/', { replace: true })
    } catch (e) {
      const msgs = e.message.split(',').map(m => m.trim())
      setErrors(msgs)
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
        <Button
          icon={<LeftOutlined />}
          onClick={() => navigate('/')}
          style={{ background: 'rgba(20,20,24,0.85)', borderColor: 'rgba(0,188,212,0.25)', color: '#00bcd4' }}
        >
          Inicio
        </Button>
      </div>

      <div style={{ position: 'relative', zIndex: 1, ...cardStyle }}>
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <img src='/titulo.png' alt='Pokédex' style={{ maxWidth: '200px', width: '100%' }} />
        </div>

        {errors.map((msg, i) => (
          <Alert key={i} message={msg} type='error' showIcon style={{ marginBottom: 8 }} />
        ))}

        <Form layout='vertical' onFinish={handleSubmit}>
          <Form.Item
            label={<span style={labelStyle}>Usuario</span>}
            name='username'
            rules={[{ required: true, message: 'Ingresa un nombre de usuario' }]}
          >
            <Input className='login-input' />
          </Form.Item>
          <Form.Item
            label={<span style={labelStyle}>Email</span>}
            name='email'
            rules={[{ required: true, type: 'email', message: 'Ingresa un email válido' }]}
          >
            <Input className='login-input' />
          </Form.Item>
          <Form.Item
            label={<span style={labelStyle}>Contraseña</span>}
            name='password'
            rules={[{ required: true, min: 6, message: 'Mínimo 6 caracteres' }]}
          >
            <Input.Password className='login-input' />
          </Form.Item>
          <Form.Item style={{ marginBottom: 12, marginTop: 8 }}>
            <Button htmlType='submit' loading={loading} style={submitBtnStyle}>
              Crear cuenta
            </Button>
          </Form.Item>
        </Form>

        <Flex justify='center' gap={4}>
          <Typography.Text style={{ color: '#666', fontSize: 13 }}>¿Ya tenés cuenta?</Typography.Text>
          <Typography.Link href='/login' style={{ fontSize: 13 }}>Iniciar sesión</Typography.Link>
        </Flex>
      </div>
    </div>
  )
}

export default RegisterPage
