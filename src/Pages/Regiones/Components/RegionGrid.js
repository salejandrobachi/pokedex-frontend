import React, { useState } from 'react'
import { Input, Button, Flex, Image } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { useFetch } from '../../../FetchApi/useFetch'
import CardRegion from './CardRegion'

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

function RegionGrid() {
  const [searchValue, setSearchValue] = useState('')
  const { data, loading } = useFetch(`${process.env.REACT_APP_API_URL}/api/regions`)
  const navigate = useNavigate()

  return (
    <div style={darkCard}>
      <div style={{ display: 'flex', justifyContent: 'center', width: '100%', padding: '24px' }}>
        <Input
          variant='filled'
          placeholder='Busca una Región en específico'
          value={searchValue}
          onChange={e => setSearchValue(e.target.value)}
          style={{ width: 400, fontSize: '1.2em', padding: '10px' }}
        />
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '8px', marginTop: '-8px' }}>
        <Button
          icon={<SearchOutlined />}
          onClick={() => navigate(`/regiones/nombre?nombre=${encodeURIComponent(searchValue)}`)}
          style={{ backgroundColor: '#1dd168', borderColor: '#1dd168', marginBottom: '10px' }}
          className='search-button'
          disabled={!searchValue}
        >
          Buscar
        </Button>
      </div>
      <Flex gap='middle' wrap justify='center' style={{ marginBottom: '20px', padding: '0 24px' }}>
        {data && Array.isArray(data) ? (
          data.map(breed => (
            <CardRegion key={breed.nombre} Nombre={breed.nombre} Link={breed.Linkimage} />
          ))
        ) : loading ? (
          <Image
            width={300}
            src='https://cdn.dribbble.com/users/621155/screenshots/2835314/simple_pokeball.gif'
            preview={false}
          />
        ) : null}
      </Flex>
    </div>
  )
}

export default RegionGrid
