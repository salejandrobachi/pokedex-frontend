import React, { useState, useEffect } from 'react';
import { Typography, Menu, Flex, Image } from 'antd';
import { useSearchParams } from 'react-router-dom';

const { Title } = Typography;

function BusquedaRegiones() {
  // eslint-disable-next-line no-unused-vars
  const [Region, setRegion] = useState(null);
  const [searchParams] = useSearchParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const nombreDesdeUrl = searchParams.get('nombre');
    const nombreBusqueda = decodeURIComponent(nombreDesdeUrl)

    setData(null);
    setLoading(true);

    if (nombreDesdeUrl) {
      setRegion(nombreBusqueda);
    }


    const url = `${process.env.REACT_APP_API_URL}/api/regions/name?name=${nombreBusqueda}`
    if (url) {
      fetch(url)
        .then((response) => response.json())
        .then((responseData) => {
          setData(responseData);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          setData([]);
          setLoading(false);
        });
    } else {
      setData([]);
      setLoading(false);
    }
  }, [searchParams]);

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
          Busqueda de Regiones
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
        <div id="contenedor-principal" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', padding: '24px' }}>
          {loading ? (
            <Image
              width={300}
              src='https://cdn.dribbble.com/users/621155/screenshots/2835314/simple_pokeball.gif'
              preview={false} />
          ) : data && data[0].nombre ? (
            <Flex gap="middle" wrap={false} justify="flex-start" align="flex-start">
              <Image
                width={300}
                style={{ marginLeft: '-100px' }}
                src={data[0].Linkimage} 
                preview={false} />
              <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '24px' }}>
                <p style={{ color: '#ccc', marginTop: '0', fontSize: '3em', fontWeight: 'bold', textAlign: 'left', marginBottom: '16px', padding: '0' }}>
                  Datos de la Región:
                </p>
                <p style={{ color: '#ccc', marginTop: '0', fontSize: '1.2em', textAlign: 'left', marginBottom: '8px', padding: '0' }}>
                  <strong>Nombre de la Región:</strong> {data[0].nombre}
                </p>
                <p style={{ color: '#ccc', marginTop: '0', fontSize: '1.2em', textAlign: 'left', marginBottom: '8px', padding: '0' }}>
                  <strong>Generacion:</strong> {data[0].generacion}
                </p>
                <p style={{ color: '#ccc', marginTop: '0', fontSize: '1.2em', textAlign: 'left', marginBottom: '8px', padding: '0' }}>
                  <strong>Caracteristica:</strong> {data[0].caracteristica}
                </p>
              </div>
            </Flex>
          ) : (
            <Image
              width={300}
              src='https://i.giphy.com/UHAYP0FxJOmFBuOiC2.webp'
              preview={false} />
          )}
        </div>
      </div>
    </div>
  )
}

export default BusquedaRegiones;