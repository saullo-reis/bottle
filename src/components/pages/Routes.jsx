import { Routes, Route} from 'react-router-dom'
import { Login } from '../login'
import { Register } from '../login/register'
import { Home } from '../home'

export const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Login/>}></Route>
            <Route path="/register" element={<Register/>}></Route>
            <Route path='/home' element={<Home/>}></Route>
        </Routes>
    )
}