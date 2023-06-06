import { Routes, Route} from 'react-router-dom'
import { Login } from '../components/login'
import { Register } from '../components/login/register/Register'
import { Main } from '../components/main'
import { Perfil } from '../components/perfil'
import { Home } from '../components/home'
import { Notifications } from '../components/notification/index'

export const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home/>}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register/>}></Route>
            <Route path='/feed' element={<Main/>}></Route>
            <Route path='/notifications' element={<Notifications />}></Route>
            <Route path='/perfil/:name/:id' element={<Perfil/>}></Route>
        </Routes>
    )
}