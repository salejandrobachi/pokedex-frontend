import React, { useState, useRef } from 'react';
import { Button, Input, Collapse, Flex, Radio, Menu } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import './PokedexPage.css';

const { Panel } = Collapse;

function PokedexPage() {
  const [searchValue, setSearchValue] = useState('');
  const [mostrarBusquedaAvanzada, setMostrarBusquedaAvanzada] = useState(false);
  const advancedSearchRef = useRef(null);
  const [searchCriterio, setSearchCriterio] = useState(1);
  const navigate = useNavigate();


  const handleSearch = (value) => {
    const Dividir = value.split(',');
    const DividirSinEspacios = Dividir.map(elemento => elemento.trim());
    FunBuscar(DividirSinEspacios, searchCriterio);
  };

  const handleRandomPokemon = () => {
    const randomNumber = Math.floor(Math.random() * 1026).toString().padStart(3, '0');
    setSearchValue(randomNumber);
    const NumberArray = [randomNumber.toString()];
    FunBuscar(NumberArray, 1);
  };

  const toggleBusquedaAvanzada = () => {
    setMostrarBusquedaAvanzada(!mostrarBusquedaAvanzada);
  };

  const handleRadioChange = (e) => {
    const newValue = e.target.value;
    setSearchCriterio(newValue);
    switch (newValue) {
      case 1:
        setSearchValue('');
        break;
      case 2:
        setSearchValue('');
        break;
      case 3:
        setSearchValue('');
        break;
      case 4:
        setSearchValue('');
        break;
      case 5:
      setSearchValue('');
      break;
      default:
        setSearchValue('');
        break;
    }
  };

  const getPlaceholderText = () => {
    switch (searchCriterio) {
      case 1:
        return "Número del Pokédex Nacional";
      case 2:
        return "Nombre del Pokémon";
      case 3:
        return "Tipo de Pokémon (ej: Agua, Fuego)";
      case 4:
        return "Debilidad del Pokémon (ej: Eléctrico, Planta)";
      case 5:
        return "Región del Pokémon";
      default:
        return "Número del Pokédex Nacional";
    }
    
  };

  //let ruta = window.location.pathname;
  //let segmentos = ruta.split("/");
  //console.log('estas en la ruta:', segmentos);
  //const current = [segmentos[1].toString];
  const [current] = useState('home')
  const onClick = e => {
    switch (e.key) {
      case 'home':
        return window.location.href='/';
      case 'region':
        return window.location.href='/regiones';
      case 'type':
        return window.location.href='/tipos';
      case 'resistencia':
        return window.location.href='/resistencias';
      case 'debilidad':
        return window.location.href='/debilidades';
        case 'inmunidad':
        return window.location.href='/inmunidades';
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

  const FunBuscar = (entrada, criterio) => {
    let dato;
    switch (criterio) {
      case 1:
        dato = [entrada[0].toString()];
        console.log('Buscar:', dato, 'por criterio:', criterio)
        navigate(`/busqueda?pokemon=${encodeURIComponent(dato)}&criterio=${encodeURIComponent(criterio)}`);
        break;

      case 2:
        dato = [entrada[0].toString()];
        console.log('Buscar:', dato, 'por criterio:', criterio)
        navigate(`/busqueda?pokemon=${encodeURIComponent(dato)}&criterio=${encodeURIComponent(criterio)}`);
        break;

      case 3:
        dato = entrada.slice(0,2);
        console.log('Buscar:', dato, 'por criterio:', criterio)
        navigate(`/busqueda?pokemon=${encodeURIComponent(dato)}&criterio=${encodeURIComponent(criterio)}`);
        break;

      case 4:
        dato = entrada.slice(0,7);
        console.log('Buscar:', dato, 'por criterio:', criterio)
        navigate(`/busqueda?pokemon=${encodeURIComponent(dato)}&criterio=${encodeURIComponent(criterio)}`);
        break;

      case 5:
        dato = [entrada[0].toString()];
        console.log('Buscar:', dato, 'por criterio:', criterio)
        navigate(`/busqueda?pokemon=${encodeURIComponent(dato)}&criterio=${encodeURIComponent(criterio)}`);
        break;
    
      default:
        break;
    }
  }

  return (
    <div style={{ backgroundImage: 'url(/fondo.png)', backgroundRepeat: 'repeat', backgroundSize: '150px', minHeight: '100vh', padding: '24px'}}>
      <div style={{backgroundColor: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '-10px', borderRadius: '8px'}}>
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
        <img
          src="/titulo.png"
          alt="BachiDex"
          style={{ height: '150px' }}
        />
      </div>

      <div 
      style={{ backgroundColor: '#303030',
      borderRadius: '8px 8px 0 0',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      overflow: 'hidden' }}>
        <div style={{ display: 'flex', justifyContent: 'center', width: '100%', padding: '24px' }}>
          <Input
            variant="filled"
            placeholder={getPlaceholderText()}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            style={{ width: 400, fontSize: '1.2em', padding: '10px' }}
          />
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '5px' }}>
          <Button
            icon={<SearchOutlined />}
            onClick={() => handleSearch(searchValue)}
            style={{ backgroundColor: '#1dd168', borderColor: '#1dd168' }}
            className='search-button'
            disabled={!searchValue}
          >
            Buscar
          </Button>
          <Button
            style={{ marginLeft: '8px', backgroundColor: '#ff8503', borderColor: '#ff8503' }}
            onClick={() => handleRandomPokemon()}
            className="aleatorio-button"
          >
            Aleatorio
          </Button>
        </div>
        <p style={{ color: '#ccc', marginTop: '0', fontSize: '0.9em', textAlign: 'center', marginBottom: '16px', padding: '0 24px' }}>
          ¡Usa la búsqueda avanzada para encontrar Pokémon por su Nombre, Región, Tipo o Debilidad!
        </p>
      </div>

      <Collapse
        activeKey={mostrarBusquedaAvanzada ? ['advanced'] : []}
        style={{
          width: '100%',
          borderRadius: '0 0 8px 8px',
          marginTop: '-2px',
          border: 'none',
        }}
        ref={advancedSearchRef}
      >
        <Panel
          header={
          <div onClick={toggleBusquedaAvanzada} style={{ textAlign: 'center',
            color: '#ccc',
            cursor: 'pointer' }}
            >
              {mostrarBusquedaAvanzada ? 'Ocultar búsqueda avanzada' : 'Mostrar búsqueda avanzada'} 
          </div>}
          key="advanced"
          style={{ border: 'none', backgroundColor: '#444' }}
        >
          <div style={{ padding: '0px', justifyContent: 'center' }}>
            <p style={{ textAlign: 'center', color: 'white' }}>Busca Pokémon por: </p>
          <Flex gap={8} wrap="wrap" align="center" justify="center">
            <Radio.Group
              type="button"
              buttonStyle="solid"
              value={searchCriterio}
              onChange={handleRadioChange}
              style={{ width: 'auto' }}
            >
              <Radio.Button value={1} style={{ textAlign: 'center', flex: 1 }}>Numero de Pokédex</Radio.Button>
              <Radio.Button value={2} style={{ textAlign: 'center', flex: 1 }}>Nombre</Radio.Button>
              <Radio.Button value={5} style={{ textAlign: 'center', flex: 1 }}>Región</Radio.Button>
              <Radio.Button value={3} style={{ textAlign: 'center', flex: 1 }}>Tipo</Radio.Button>
              <Radio.Button value={4} style={{ textAlign: 'center', flex: 1 }}>Debilidad</Radio.Button>
            </Radio.Group>
          </Flex>
          </div>
        </Panel>
      </Collapse>
    </div>
  );
}

export default PokedexPage;