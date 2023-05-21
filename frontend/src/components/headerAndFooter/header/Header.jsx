import { ImMenu } from 'react-icons/im'
import { useState } from 'react'
import './StyleHeader.sass'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

export const Header = () => {
    const [show, setShow] = useState('none')
    const navigate = useNavigate()
    const userDefault = useSelector((state) => state.data)
    const handleClick = () => show === 'none' ? setShow('flex') : setShow('none')
    const handleLogout = () => {
        localStorage.setItem('user', JSON.stringify(userDefault) )
        navigate('/')
    }


    return(
        <section className="header">
            <h1 className="header-logo">Bottle</h1>
            <ImMenu onClick={() => handleClick()}/>
            <aside style={{display: show}}>
                <p>Perfil</p>
                <p>Amigos</p>
                <p>Mensagens</p>
                <p>Tema</p>
                <p onClick={() => handleLogout()}>Logout</p>
            </aside>
        </section>
    )
}