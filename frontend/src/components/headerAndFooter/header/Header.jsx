import { ImMenu } from 'react-icons/im'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { styled } from 'styled-components'
import { IoIosLogOut, IoIosNotifications, IoIosPerson } from 'react-icons/io'

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
    const notifications = JSON.parse(user.notification)


    return (
        <HeaderStyle>
            <Link to={'/feed'}><h1 className="header-logo">Bottle</h1></Link>
            <button className='button-menu'><ImMenu onClick={() => handleClick()} /></button>
            <aside style={{ display: show }}>
                <Link to={'/perfil/' + user.name + '/' + user.id}>Perfil</Link>
                <Link to={'/notifications'} className='notifications'>Notificações</Link>
                <p onClick={() => handleLogout()} style={{ color: 'red' }}>Logout</p>
            </aside>
            <nav className='navigation'>
                <Link to={'/notifications'}><span className='notifications-span'>{notifications.length}</span><IoIosNotifications className='icon-notifications'></IoIosNotifications></Link>
                <Link to={'/perfil/' + user.name + '/' + user.id}><IoIosPerson /></Link>
                <p onClick={() => handleLogout()} style={{ color: 'red' }}><IoIosLogOut /></p>
            </nav>
            
        </HeaderStyle>
    )
}

const HeaderStyle = styled.section`
    width: 100%;
    display: flex;
    align-items: center;
    position: fixed;
    justify-content: space-between;
    background-color: #121212;
    color: #22e;
    z-index: 999;
    text-shadow: 0 1px 2px black;
    .navigation{
        display: flex;
    }
    .button-menu{
        border: none;
        background: none;
        color: #22e;
        display: none;
    }
    .icon-notifications{
        position: relative;
    }
    .notifications-span{
        position: absolute;
        top: 0;
        color: #fff;
        right: 110px;
        font-size: 10px;
        z-index: 3;
        border-radius: 50%;
        background-color: #e71111;
        padding: 1px 5px;
        animation: pulsing infinite ease forwards 3s;

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
        z-index: 4;
        border: solid 1px black;
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
    @media (max-width: 500px) {
        .button-menu{
            display: block;
        }
        .navigation{
            display: none;
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