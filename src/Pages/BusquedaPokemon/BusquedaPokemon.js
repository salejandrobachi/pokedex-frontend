import React, { useState, useEffect } from 'react';
import { Typography, Menu, Flex, Image } from 'antd';
import { useSearchParams } from 'react-router-dom';
import './BusquedaPokemon.css';
import PokemonData from '../../Components/CardPokemon';

const { Title } = Typography;

function BusquedaPokemon() {

  // eslint-disable-next-line no-unused-vars
  const [Pokemon, setPokemon] = useState(null);
  const [criterio, setCriterio] = useState(null);
  const [searchParams] = useSearchParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const nombreDesdeUrl = searchParams.get('pokemon');
    const criterioDesdeUrl = searchParams.get('criterio');
    const criterioBusqueda = decodeURIComponent(criterioDesdeUrl)
    const nombreBusqueda = decodeURIComponent(nombreDesdeUrl)

    setData(null);
    setLoading(true);

    if (nombreDesdeUrl) {
      setPokemon(nombreBusqueda);
    }
    if (criterioDesdeUrl) {
      setCriterio(criterioBusqueda);
    }
    const nombreArray = [nombreBusqueda];
    let nombreArraySeparado = [];

    for (let i = 0; i < nombreArray.length; i++) {
      if (nombreArray[i].includes(',')) {
        let partes = nombreArray[i].split(',');
        nombreArraySeparado.push(...partes);
      } else {
        nombreArraySeparado.push(nombreArray[i]);
      }
    }

    const url = FunFetch(nombreArraySeparado, criterioBusqueda);
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

  const FunFetch = (nombre, tipoBusqueda) => {
    let urlApi;
    switch (tipoBusqueda) {
      case '1':
        urlApi = `http://localhost:3001/api/pokemon/number/${nombre}`
        return urlApi;
      case '2':
        urlApi = `http://localhost:3001/api/pokemon/name/${nombre}`
        return urlApi;
      case '3':
        urlApi = `http://localhost:3001/api/pokemon/type?type1=${nombre[0]}${nombre[1] ? `&type2=${nombre[1]}` : ''}`
        return urlApi;
      case '4':
        urlApi = `http://localhost:3001/api/pokemon/week?`;
        const weekParams = [];
        for (let i = 0; i < nombre.length; i++) {
          if (nombre[i]) {
            weekParams.push(`week${i + 1}=${nombre[i]}`);
          }
        }
        urlApi += weekParams.join('&');
        return urlApi;
      case '5':
        urlApi = `http://localhost:3001/api/pokemon/region/${nombre}`
        return urlApi;
      default:
        break;
    }
  }

  const [current, setCurrent] = useState('home');
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
          Búsqueda Pokémon
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
        {criterio === '1' || criterio === '2' ? (
          <div id="contenedor-principal" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', padding: '24px' }}>
            {loading ? (
              <Image
              width={300}
              src='https://cdn.dribbble.com/users/621155/screenshots/2835314/simple_pokeball.gif'
              preview={false}/>
            ) : data && data.nombre ? (
              <Flex gap="middle" wrap={false} justify="flex-start" align="flex-start">
                <Image
                  width={300}
                  style={{ marginLeft: '-100px' }}
                  preview={false}
                  src={`https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/${data.numero}.png`
                  } />
                <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '24px' }}>
                  <p style={{ color: '#ccc', marginTop: '0', fontSize: '3em', fontWeight: 'bold', textAlign: 'left', marginBottom: '16px', padding: '0' }}>
                    Datos del Pokémon:
                  </p>
                  <p style={{ color: '#ccc', marginTop: '0', fontSize: '1.2em', textAlign: 'left', marginBottom: '8px', padding: '0' }}>
                    <strong>Nombre del Pokémon:</strong> {data.nombre}
                  </p>
                  <p style={{ color: '#ccc', marginTop: '0', fontSize: '1.2em', textAlign: 'left', marginBottom: '8px', padding: '0' }}>
                    <strong>Número de Pokédex:</strong> {data.numero}
                  </p>
                  <p style={{ color: '#ccc', marginTop: '0', fontSize: '1.2em', textAlign: 'left', marginBottom: '8px', padding: '0' }}>
                    <strong>Región:</strong> {data.region}
                  </p>
                  <p style={{ color: '#ccc', marginTop: '0', fontSize: '1.2em', textAlign: 'left', marginBottom: '8px', padding: '0' }}>
                    <strong>Tipo:</strong> {data.tipo_1} {data.tipo_2}
                  </p>
                  <p style={{ color: '#ccc', marginTop: '0', fontSize: '1.2em', textAlign: 'left', marginBottom: '8px', padding: '0' }}>
                    <strong>Debilidades:</strong> {data.debilidad_1} {data.debilidad_2} {data.debilidad_3} {data.debilidad_4} {data.debilidad_5} {data.debilidad_6} {data.debilidad_7}
                  </p>
                </div>
              </Flex>
            ) : data && Array.isArray(data) && data.length > 0 ? (
              <Image
              width={300}
              src='https://i.giphy.com/UHAYP0FxJOmFBuOiC2.webp'
              preview={false}/>
            ) : (
              <Image
              width={300}
              src='https://i.giphy.com/UHAYP0FxJOmFBuOiC2.webp'
              preview={false}/>
            )}
          </div>
        ) : (criterio === '3' || criterio === '4' || criterio === '5' ? (
          <div id="contenedor-principal" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', padding: '24px' }}>
            {loading ? (
              <Image
              width={300}
              src='https://cdn.dribbble.com/users/621155/screenshots/2835314/simple_pokeball.gif'
              preview={false}/>
            ) : data && data.length > 0 ? (
              <Flex gap="middle" wrap justify="center">
                {data.map((breed) => (
                  <PokemonData
                    key={breed.numero}
                    numero={breed.numero}
                    nombre={breed.nombre}
                  />
                ))}
              </Flex>
            ) : (
              <Image
              width={300}
              src='https://i.giphy.com/UHAYP0FxJOmFBuOiC2.webp'
              preview={false}/>
            )}
          </div>
        ) : null)}
      </div>
    </div>
  )
}

export default BusquedaPokemon;