import { BiUserCircle } from 'react-icons/bi'
import { useState } from 'react'
import './StyleHeader.sass'

export const Header = () => {

    const [show, setShow] = useState('none')
    const handleClick = () => show === 'none' ? setShow('flex') : setShow('none')

    return(
        <section className="header">
            <h1 className="header-logo">Bottle</h1>
            <BiUserCircle onClick={() => handleClick()}/>
            <aside style={{display: show}}>
                <p>Perfil</p>
                <p>Amigos</p>
                <p>Mensagens</p>
            </aside>
        </section>
    )
}