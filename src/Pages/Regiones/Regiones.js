import React, { useState } from 'react';
import { Typography, Menu, Input, Button, Flex, Image } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import RegionData from '../../Components/CardRegion';
import { useFetch } from '../../FetchApi/useFetch';
import './Regiones.css';

const { Title } = Typography;

function Regiones() {
  const [searchValue, setSearchValue] = useState('');

  const { data, loading } = useFetch('http://localhost:3001/api/regions');

  const [current, setCurrent] = useState('region');
  const onClick = e => {
    setCurrent(e.key);
    switch (e.key) {
      case 'home':
        return window.location.href = '/';
      case 'region':
        return window.location.href = '/regiones';
      case 'type':
        return window.location.href = '/tipos';
      case 'resistencia':
        return window.location.href = '/resistencias';
      case 'debilidad':
        return window.location.href = '/debilidades';
      case 'inmunidad':
        return window.location.href = '/inmunidades';
      default:
        return;
    }
  };

  const items = [
    {
      label: 'Inicio',
      key: 'home'
    },
    {
      label: 'Región',
      key: 'region'
    },
    {
      label: 'Tipos',
      key: 'type'
    },
    {
      label: 'Resistencias',
      key: 'resistencia'
    },
    {
      label: 'Debilidades',
      key: 'debilidad'
    },
    {
      label: 'Inmunidad',
      key: 'inmunidad'
    }
  ]


  return (
    <div style={{ backgroundColor: '#f0f0f0', minHeight: '100vh', padding: '24px' }}>
      <div style={{ backgroundColor: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '-10px', borderRadius: '8px' }}>
        <Menu mode="horizontal" items={items} onClick={onClick} selectedKeys={[current]} />
      </div>
      <div style={{
        backgroundColor: 'white',
        padding: '24px',
        borderRadius: '8px',
        marginBottom: '24px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100px',
      }}>
        <Title level={1}
          style={{
            textAlign: 'center',
            marginBottom: 0,
            marginTop: 0,
            padding: 0,
            lineHeight: '1',
            fontSize: '64px',
            fontFamily: '-moz-initial'
          }}>
          Regiones
        </Title>
      </div>

      <div
        style={{
          backgroundColor: '#303030',
          borderRadius: '8px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          overflow: 'hidden',
          marginBottom: '8px'
        }}>
        <div style={{ display: 'flex', justifyContent: 'center', width: '100%', padding: '24px' }}>
          <Input
            variant="filled"
            placeholder="Busca una Región en específico"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            style={{ width: 400, fontSize: '1.2em', padding: '10px' }}
          />
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '8px', marginTop: '-8px' }}>
          <Link to={`/regiones/nombre?nombre=${encodeURIComponent(searchValue)}`}>
            <Button
              icon={<SearchOutlined />}
              style={{ backgroundColor: '#1dd168', borderColor: '#1dd168', marginBottom: '10px' }}
              className='search-button'
              disabled={!searchValue}
            >
              Buscar
            </Button>
          </Link>
        </div>
        <Flex gap="middle" wrap justify="center" style={{ marginBottom: '20px' }}>
          {console.log("Valor de data:", data)}
          {data && Array.isArray(data) ? (
            data.map((breed) => (
              <RegionData
                key={breed.nombre}
                Nombre={breed.nombre}
                Link={breed.Linkimage}
              />
            ))
          ) : (
            <p style={{ color: 'white' }}>
              {loading ? 
              <Image
              width={300}
              src='https://cdn.dribbble.com/users/621155/screenshots/2835314/simple_pokeball.gif'
              preview={false} /> 
              : null}
            </p>
          )}
        </Flex>
      </div>
    </div>
  )
}

export default Regiones;