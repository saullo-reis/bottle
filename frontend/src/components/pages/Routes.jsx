import { Routes, Route} from 'react-router-dom'
import { Login } from '../login'
import { Register } from '../login/register/Register'
import { Main } from '../main'
import { Perfil } from '../perfil'
import { Home } from '../home'

export const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home/>}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register/>}></Route>
            <Route path='/home' element={<Main/>}></Route>
            <Route path='/perfil/:name' element={<Perfil/>}></Route>
        </Routes>
    )
}