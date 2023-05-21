import { Routes, Route} from 'react-router-dom'
import { Login } from '../login'
import { Register } from '../login/register/Register'
import { Home } from '../home'
import { Perfil } from '../perfil'

export const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Login/>}></Route>
            <Route path="/register" element={<Register/>}></Route>
            <Route path='/home' element={<Home/>}></Route>
            <Route path='/perfil/:name' element={<Perfil/>}></Route>
        </Routes>
    )
}