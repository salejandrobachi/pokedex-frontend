import React, { useState } from 'react'
import { Form, Input, Button, Alert, Modal } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../Context/AuthContext'
import { updateUser, deleteUser } from '../../services/auth.service'
import ProfileLayout from '../../Components/ProfileLayout/ProfileLayout'

const cardStyle = {
  background: 'rgba(20,20,24,0.9)',
  border: '1px solid rgba(0,188,212,0.25)',
  borderRadius: '12px',
  padding: '28px',
}

const ghostBtn = {
  background: 'transparent',
  borderColor: 'rgba(0,188,212,0.4)',
  color: '#00bcd4',
}

const labelStyle = { color: '#aaa', fontSize: 13 }

function ProfilePage() {
  const { user, token, login, logout } = useAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [success, setSuccess] = useState(null)
  const [error, setError] = useState(null)

  async function handleUpdate(values) {
    setLoading(true)
    setError(null)
    setSuccess(null)
    try {
      const updated = await updateUser(user.id, { username: values.username }, token)
      login(token, { ...user, username: updated.username ?? values.username })
      setSuccess('Usuario actualizado correctamente')
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  async function handleDelete() {
    setDeleting(true)
    console.log('user object:', user)
    console.log('user.id:', user?.id)
    try {
      await deleteUser(user.id, token)
      logout()
      navigate('/')
    } catch (e) {
      setError(e.message)
      setShowDeleteModal(false)
    } finally {
      setDeleting(false)
    }
  }

  return (
    <ProfileLayout title='Mi perfil'>
      <div style={cardStyle}>
        {/* Info de solo lectura */}
        <div style={{ marginBottom: 24 }}>
          <InfoRow label='Email' value={user?.email} />
          <InfoRow label='Rol' value={user?.role} />
        </div>

        {success && <Alert message={success} type='success' showIcon style={{ marginBottom: 16 }} />}
        {error && <Alert message={error} type='error' showIcon style={{ marginBottom: 16 }} />}

        {/* Cambiar username */}
        <Form layout='vertical' onFinish={handleUpdate} initialValues={{ username: user?.username }}>
          <Form.Item
            label={<span style={labelStyle}>Nombre de usuario</span>}
            name='username'
            rules={[{ required: true, message: 'Ingresa un nombre de usuario' }]}
          >
            <Input className='login-input' />
          </Form.Item>
          <Form.Item style={{ marginBottom: 0 }}>
            <Button htmlType='submit' loading={loading} style={{ ...ghostBtn, width: '100%', height: 38 }}>
              Guardar cambios
            </Button>
          </Form.Item>
        </Form>

        <div style={{ marginTop: 16, display: 'flex', gap: 8 }}>
          <Button
            style={{ flex: 1, background: 'transparent', borderColor: 'rgba(255,77,79,0.4)', color: '#ff4d4f' }}
            onClick={() => setShowDeleteModal(true)}
          >
            Eliminar cuenta
          </Button>
          <Button style={{ flex: 1, ...ghostBtn }} onClick={() => { logout(); navigate('/') }}>
            Cerrar sesión
          </Button>
        </div>
      </div>

      <Modal
        open={showDeleteModal}
        title={<span style={{ color: '#ccc' }}>¿Eliminar cuenta?</span>}
        onCancel={() => setShowDeleteModal(false)}
        onOk={handleDelete}
        confirmLoading={deleting}
        okText='Eliminar'
        okButtonProps={{ danger: true }}
        cancelText='Cancelar'
      >
        <p style={{ color: '#aaa' }}>Esta acción no se puede deshacer.</p>
      </Modal>
    </ProfileLayout>
  )
}

function InfoRow({ label, value }) {
  return (
    <div style={{ display: 'flex', gap: 8, marginBottom: 8, alignItems: 'baseline' }}>
      <span style={{ color: '#555', fontSize: 13, minWidth: 50 }}>{label}:</span>
      <span style={{ color: '#ccc', fontSize: 14 }}>{value}</span>
    </div>
  )
}

export default ProfilePage
