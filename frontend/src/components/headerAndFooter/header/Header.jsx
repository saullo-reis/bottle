import { ImMenu } from 'react-icons/im'
import { useState } from 'react'
import './StyleHeader.sass'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

export const Header = () => {
    const [show, setShow] = useState('none')
    const navigate = useNavigate()
    const userDefault = useSelector((state) => state.data)
    const handleClick = () => show === 'none' ? setShow('flex') : setShow('none')
    const handleLogout = () => {
        localStorage.setItem('user', JSON.stringify(userDefault))
        navigate('/')
    }
    const user = JSON.parse(localStorage.getItem('user'))


    return (
        <section className="header">
            <Link to={'/Home'}><h1 className="header-logo">Bottle</h1></Link>
            <ImMenu onClick={() => handleClick()} />
            <aside style={{ display: show }}>
                <Link to={'/perfil/'+user.name}>Perfil</Link>
                <p>Amigos</p>
                <p>Mensagens</p>
                <p>Tema</p>
                <p onClick={() => handleLogout()}>Logout</p>
            </aside>
        </section>
    )
}