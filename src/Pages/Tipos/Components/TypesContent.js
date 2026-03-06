import React, { useState, useEffect } from 'react'
import { Input, Row, Col, Image } from 'antd'
import { useLazyFetch } from '../../../FetchApi/useFetch'
import TypeRow from './TypeRow'

const darkCard = {
  background: 'rgba(20,20,24,0.9)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(0,188,212,0.25)',
  borderRadius: '8px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  overflow: 'hidden',
}

function TypesContent() {
  const [searchValue, setSearchValue] = useState('')
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const { fetchApiData } = useLazyFetch()

  useEffect(() => {
    setLoading(true)
    fetchApiData('tipos', 'GET')
      .then(d => { setData(d || []); setLoading(false) })
      .catch(() => setLoading(false))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleFilter = e => {
    const val = e.target.value
    setSearchValue(val)
    setLoading(true)
    const endpoint = val ? `tipos/nombre?name=${val}` : 'tipos'
    fetchApiData(endpoint, 'GET')
      .then(d => { setData(d || []); setLoading(false) })
      .catch(() => setLoading(false))
  }

  return (
    <div style={darkCard}>
      <div style={{ display: 'flex', justifyContent: 'center', width: '100%', padding: '24px' }}>
        <Input
          variant='filled'
          placeholder='Busca un Tipo en específico'
          value={searchValue}
          onChange={handleFilter}
          style={{ width: 400, fontSize: '1.2em', padding: '10px' }}
        />
      </div>
      {loading ? (
        <Image
          width={300}
          src='https://cdn.dribbble.com/users/621155/screenshots/2835314/simple_pokeball.gif'
          preview={false}
          style={{ marginBottom: '16px' }}
        />
      ) : data.length > 0 ? (
        <Row gutter={[16, 16]} style={{ marginBottom: '16px' }}>
          {data.map(breed => (
            <Col key={breed.nombre} span={8} style={{ textAlign: 'center' }}>
              <TypeRow Nombre={breed.nombre} Link={breed.LinkImage} />
            </Col>
          ))}
        </Row>
      ) : (
        <Image
          width={300}
          src='https://i.giphy.com/UHAYP0FxJOmFBuOiC2.webp'
          preview={false}
          style={{ marginBottom: '16px' }}
        />
      )}
    </div>
  )
}

export default TypesContent
