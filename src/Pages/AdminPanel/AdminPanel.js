import React, { useEffect, useState } from 'react'
import { Table, Button, Modal, Form, Input, Select, Alert } from 'antd'
import { EditOutlined } from '@ant-design/icons'
import { useAuth } from '../../Context/AuthContext'
import { getAdminUsers, updateAdminUser } from '../../services/auth.service'
import ProfileLayout from '../../Components/ProfileLayout/ProfileLayout'

const ghostBtn = {
  background: 'transparent',
  borderColor: 'rgba(0,188,212,0.4)',
  color: '#00bcd4',
}

const labelStyle = { color: '#aaa', fontSize: 13 }

function AdminPanel() {
  const { token } = useAuth()
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [editingUser, setEditingUser] = useState(null)
  const [saving, setSaving] = useState(false)
  const [form] = Form.useForm()

  useEffect(() => {
    getAdminUsers(token)
      .then(setUsers)
      .catch(e => setError(e.message))
      .finally(() => setLoading(false))
  }, [token])

  function openEdit(user) {
    setEditingUser(user)
    form.setFieldsValue({ username: user.username, email: user.email, role: user.role })
  }

  async function handleSave() {
    const values = await form.validateFields()
    setSaving(true)
    try {
      const updated = await updateAdminUser(editingUser.id, values, token)
      setUsers(prev => prev.map(u => u.id === editingUser.id ? { ...u, ...updated } : u))
      setEditingUser(null)
    } catch (e) {
      setError(e.message)
    } finally {
      setSaving(false)
    }
  }

  const columns = [
    { title: 'ID', dataIndex: 'id', width: 60, render: v => <span style={{ color: '#666' }}>{v}</span> },
    { title: 'Usuario', dataIndex: 'username', render: v => <span style={{ color: '#ccc' }}>{v}</span> },
    { title: 'Email', dataIndex: 'email', render: v => <span style={{ color: '#ccc' }}>{v}</span> },
    {
      title: 'Rol', dataIndex: 'role',
      render: v => (
        <span style={{ color: v === 'admin' ? '#00bcd4' : '#888', fontWeight: v === 'admin' ? 600 : 400 }}>
          {v}
        </span>
      )
    },
    {
      title: '', key: 'actions', width: 80,
      render: (_, record) => (
        <Button icon={<EditOutlined />} style={ghostBtn} size='small' onClick={() => openEdit(record)} />
      )
    },
  ]

  return (
    <ProfileLayout title='Panel de administración'>
      <div>
        {error && <Alert message={error} type='error' showIcon style={{ marginBottom: 16 }} />}
        <Table
          dataSource={users}
          columns={columns}
          rowKey='id'
          loading={loading}
          pagination={{ pageSize: 10 }}
          style={{
            background: 'rgba(20,20,24,0.9)',
            border: '1px solid rgba(0,188,212,0.25)',
            borderRadius: '12px',
          }}
        />
      </div>

      <Modal
        open={!!editingUser}
        title={<span style={{ color: '#ccc' }}>Editar usuario</span>}
        onCancel={() => setEditingUser(null)}
        onOk={handleSave}
        confirmLoading={saving}
        okText='Guardar'
        cancelText='Cancelar'
        styles={{ content: { background: 'rgba(20,20,24,0.97)', border: '1px solid rgba(0,188,212,0.25)' } }}
      >
        <Form form={form} layout='vertical' style={{ marginTop: 16 }}>
          <Form.Item
            label={<span style={labelStyle}>Usuario</span>}
            name='username'
            rules={[{ required: true }]}
          >
            <Input className='login-input' />
          </Form.Item>
          <Form.Item
            label={<span style={labelStyle}>Email</span>}
            name='email'
            rules={[{ required: true, type: 'email' }]}
          >
            <Input className='login-input' />
          </Form.Item>
          <Form.Item label={<span style={labelStyle}>Rol</span>} name='role' rules={[{ required: true }]}>
            <Select
              options={[{ value: 'user', label: 'user' }, { value: 'admin', label: 'admin' }]}
            />
          </Form.Item>
        </Form>
      </Modal>
    </ProfileLayout>
  )
}

export default AdminPanel
