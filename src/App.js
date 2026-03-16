import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './Context/AuthContext'
import PrivateRoute from './Components/PrivateRoute/PrivateRoute'
import LoginPage from './Pages/Login/LoginPage'
import RegisterPage from './Pages/Register/RegisterPage'
import ProfilePage from './Pages/Profile/ProfilePage'
import AdminPanel from './Pages/AdminPanel/AdminPanel'
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
      <AuthProvider>
        <Routes>
          {/* Públicas */}
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />

          {/* Públicas opcionales (login visible en navbar) */}
          <Route index path='/' element={<PokedexPage />} />
          <Route path='/regiones' element={<Regiones />} />
          <Route path='/tipos' element={<Tipos />} />
          <Route path='/debilidades' element={<Debilidades />} />
          <Route path='/resistencias' element={<Resistencias />} />
          <Route path='/inmunidades' element={<Inmunidades />} />
          <Route path='/busqueda' element={<BusquedaPokemon />} />
          <Route path='/regiones/nombre' element={<BusquedaRegiones />} />

          {/* Privadas */}
          <Route path='/profile' element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
          <Route path='/admin' element={<PrivateRoute adminOnly><AdminPanel /></PrivateRoute>} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
