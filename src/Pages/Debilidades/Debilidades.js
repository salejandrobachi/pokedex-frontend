import React, { useState, useEffect } from 'react';
import { Typography, Menu, Input, Row, Col, Image } from 'antd';
import { useLazyFetch } from '../../FetchApi/useFetch';
import WeakData from '../../Components/DisplayWeak';
import './Debilidades.css';

const { Title } = Typography;

function Debilidades() {
  const [searchValue, setSearchValue] = useState('');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState(null);
  const { fetchApiData } = useLazyFetch();

  const [current, setCurrent] = useState('debilidad');
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
    { label: 'Inicio', key: 'home' },
    { label: 'Región', key: 'region' },
    { label: 'Tipos', key: 'type' },
    { label: 'Resistencias', key: 'resistencia' },
    { label: 'Debilidades', key: 'debilidad' },
    { label: 'Inmunidad', key: 'inmunidad' },
  ];

  useEffect(() => {
    const loadInitialData = async () => {
      setLoading(true);
      setError(null);
      try {
        const initialData = await fetchApiData('debilidades', 'GET');
        setData(initialData || []);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    loadInitialData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const FunFiltrar = (event) => {
    const inputValue = event.target.value;
    setSearchValue(inputValue);
    setLoading(true);
    setError(null);

    const endpoint = inputValue ? `debilidades/nombre?name=${inputValue}` : 'debilidades';

    fetchApiData(endpoint, 'GET')
      .then(filteredData => {
        setData(filteredData || []);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  };


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
          Busqueda de Debilidades
        </Title>
      </div>
      <div
        style={{
          backgroundColor: '#303030',
          borderRadius: '8px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          overflow: 'hidden'
        }}>
        <div style={{ display: 'flex', justifyContent: 'center', width: '100%', padding: '24px' }}>
          <Input
            variant="filled"
            placeholder="Busca un Tipo en específico"
            value={searchValue}
            onChange={FunFiltrar}
            style={{ width: 400, fontSize: '1.2em', padding: '10px' }}
          />
        </div>,
        <Row
          gutter={[8, 16]}
          style={{ marginBottom: "16px" }}>
          {console.log("Valor de data:", data)}
          {data && Array.isArray(data) ? (
            data.map((breed) => (
              <Col span={24} style={{ textAlign: "center" }}>
                <WeakData
                  key={breed.tipo_nombre}
                  tipo={breed.tipo_nombre}
                  linkimage={breed.tipo_link_image}
                  weakimage1={breed.debilidad_1_link_image}
                  weakimage2={breed.debilidad_2_link_image}
                  weakimage3={breed.debilidad_3_link_image}
                  weakimage4={breed.debilidad_4_link_image}
                  weakimage5={breed.debilidad_5_link_image}
                />
              </Col>
            ))
          ) : (
            <p style={{ color: 'white' }}>
              {loading ?
                <Image
                  width={300}
                  src='https://cdn.dribbble.com/users/621155/screenshots/2835314/simple_pokeball.gif' />
                :
                <Image
                  width={300}
                  src='https://i.giphy.com/UHAYP0FxJOmFBuOiC2.webp' />}
            </p>
          )}
        </Row>
      </div>
    </div>
  )
}

export default Debilidades;