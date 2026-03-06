import React, { useState, useEffect } from 'react'
import { Input, Row, Col, Image } from 'antd'
import { useLazyFetch } from '../../../FetchApi/useFetch'
import WeakRow from './WeakRow'

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

function DebilidadesContent() {
  const [searchValue, setSearchValue] = useState('')
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const { fetchApiData } = useLazyFetch()

  useEffect(() => {
    setLoading(true)
    fetchApiData('debilidades', 'GET')
      .then(d => { setData(d || []); setLoading(false) })
      .catch(() => setLoading(false))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleFilter = e => {
    const val = e.target.value
    setSearchValue(val)
    setLoading(true)
    const endpoint = val ? `debilidades/nombre?name=${val}` : 'debilidades'
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
        <Row gutter={[8, 16]} style={{ marginBottom: '16px' }}>
          {data.map(breed => (
            <Col key={breed.tipo_nombre} span={24} style={{ textAlign: 'center' }}>
              <WeakRow
                tipo={breed.tipo_nombre}
                linkimage={breed.tipo_link_image}
                weakimage1={breed.debilidad_1_link_image}
                weakimage2={breed.debilidad_2_link_image}
                weakimage3={breed.debilidad_3_link_image}
                weakimage4={breed.debilidad_4_link_image}
                weakimage5={breed.debilidad_5_link_image}
              />
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

export default DebilidadesContent
