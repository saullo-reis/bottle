import { ImMenu } from 'react-icons/im'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { styled } from 'styled-components'

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
        <HeaderStyle>
            <Link to={'/Home'}><h1 className="header-logo">Bottle</h1></Link>
            <button><ImMenu onClick={() => handleClick()} /></button>
            <aside style={{ display: show }}>
                <Link to={'/perfil/' + user.name}>Perfil</Link>
                <p>Amigos</p>
                <p>Mensagens</p>
                <p>Tema</p>
                <p onClick={() => handleLogout()} style={{ color: 'red' }}>Logout</p>
            </aside>
        </HeaderStyle>
    )
}

const HeaderStyle = styled.section`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #CCC;
    color: #22e;
    text-shadow: 0 1px 2px black;
    button{
        border: none;
        background: none;
        color: #22e;
    }
        
    a{
        color: #22e;
    }
        
    svg{
        font-size: 30px;
        margin: 0 10px;
        cursor: pointer;
        transition: .7s;
        &:hover{
            transform: scale(1.1);
        }
            
    }
        
    aside{
        position: absolute;
        right: 20px;
        top: 35px;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        background-color: #22e;
        width: 120px;
        height: 150px;
        padding: 10px;
        border-top-left-radius: 16px;
        border-bottom-left-radius: 16px;
        border-bottom-right-radius: 16px;
        color: #fff;
        animation: modal .2s linear;
        p, a{
            color: white;
            cursor: pointer;
            margin: 5px 0;
        }
            
    }
        

@keyframes modal{
    0%{
        width: 0;
        height: 0;
        opacity: 0;
    }
        
    100%{
        width: 120px;
        height: 150px;
        opacity: 1;
    }
       
}
    

`