const BASE = process.env.REACT_APP_API_URL

async function handleResponse(res) {
  const data = await res.json()
  if (!res.ok) throw new Error(data.message || 'Error en la petición')
  return data
}

export async function loginUser({ login, password }) {
  const res = await fetch(`${BASE}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: login, password }),
  })
  return handleResponse(res)
}

export async function registerUser({ username, email, password }) {
  const res = await fetch(`${BASE}/api/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, email, password }),
  })
  return handleResponse(res)
}

export async function updateUser(id, data, token) {
  const res = await fetch(`${BASE}/api/users/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })
  return handleResponse(res)
}

export async function deleteUser(id, token) {
  const res = await fetch(`${BASE}/api/users/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  })
  if (!res.ok) {
    const text = await res.text()
    let message = 'Error al eliminar cuenta'
    try { message = JSON.parse(text).message || message } catch {}
    throw new Error(message)
  }
}

export async function getAdminUsers(token) {
  const res = await fetch(`${BASE}/api/admin/users`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  return handleResponse(res)
}

export async function updateAdminUser(id, data, token) {
  const res = await fetch(`${BASE}/api/admin/users/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })
  return handleResponse(res)
}
