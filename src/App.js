import { BrowserRouter, Route, Routes } from 'react-router-dom'
import PokedexPage from './Pages/PokedexPage/PokedexPage'
import Regiones from './Pages/Regiones/Regiones'
import Tipos from './Pages/Tipos/Tipos'
import Debilidades from './Pages/Debilidades/Debilidades'
import Resistencias from './Pages/Resistencias/Resistencias'
import Inmunidades from './Pages/Inmunidades/Inmunidades'
import BusquedaPokemon from './Pages/BusquedaPokemon/BusquedaPokemon'
import BusquedaRegiones from './Pages/Regiones/BusquedaRegiones/BusquedaRegiones'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path='/' element={<PokedexPage />} />
        <Route path='/regiones' element={<Regiones />} />
        <Route path='/tipos' element={<Tipos />} />
        <Route path='/debilidades' element={<Debilidades />} />
        <Route path='/resistencias' element={<Resistencias />} />
        <Route path='/inmunidades' element={<Inmunidades />} />
        <Route path='/busqueda' element={<BusquedaPokemon />} />
        <Route path='/regiones/nombre' element={<BusquedaRegiones />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
