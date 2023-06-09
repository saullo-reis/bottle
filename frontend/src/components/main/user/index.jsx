import axios from 'axios'
import ModalPhoto from './modal'
import { useState, useEffect } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ButtonCancel, ButtonConfirm } from '../../../styles/stylesComponents'
import { styled } from 'styled-components'
import { IoIosNotifications } from 'react-icons/io'
import { HiUser } from 'react-icons/hi'
import { RiLogoutBoxRFill } from 'react-icons/ri'
import { useSelector } from 'react-redux'
import { lengthNotifications } from '../../../actions/lengthNotifications'
import { ThemeContext, themes } from '../../../theme-context/theme'
import { useContext } from 'react'

export const Perfil = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [image, setImage] = useState('')
    const user = JSON.parse(localStorage.getItem('user'));
    const navigate = useNavigate()
    const userDefault = useSelector((state) => state.data)
    const [notificationLength, setNotificationLength] = useState(0)
    const {theme} = useContext(ThemeContext)

    useEffect(() => {
        if (!user.name) navigate('/')
        async function fetchData() {
            try {
                const response = await axios.get('http://localhost:3333/getUser/' + user.id, )
                localStorage.setItem('user', JSON.stringify(response.data))
                const responseNotifications = await lengthNotifications(user.id)
                setNotificationLength(responseNotifications)
            } catch (err) {
                console.error(err)
            }
        }
        fetchData();
    }, [image]);

    function resizeImage(inputImage, outputWidth, outputHeight) {
        return new Promise((resolve, reject) => {
            const canvas = document.createElement("canvas")
            const ctx = canvas.getContext('2d')

            const img = new Image()
            img.onload = function () {
                canvas.width = outputWidth
                canvas.height = outputHeight

                ctx.drawImage(img, 0, 0, outputWidth, outputHeight)

                const resizedImage = canvas.toDataURL("image/jpeg")

                resolve(resizedImage)
            }

            img.onerror = reject
            img.src = inputImage
        })
    }

    async function handleClick(e) {
        e.preventDefault()
        resizeImage(selectedImage, 300, 300)
            .then((resizedImage) => {
                axios.put('http://localhost:3333/update/' + user.id, {
                    photo: resizedImage
                })
                setIsModalOpen(false);
                toast.success('Foto atualizada com sucesso!')
                setImage(resizedImage)
            })
            .catch ((err) =>  {
                if (err.message === 'Request failed with status code 413') {
                    toast.error('Imagem muito grande')
                }
                console.error(err.message)
            })

    }

    const handleImageChange = (event) => {
        const file = event.target.files[0];

        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();

            reader.onload = () => {
                setSelectedImage(reader.result);
            };

            reader.readAsDataURL(file);
        }
    };

    function handleModalOpen() {
        setIsModalOpen(true);
    }

    function handleModalClose() {
        setIsModalOpen(false);
    }

    const handleLogout = () => {
        localStorage.setItem('user', JSON.stringify(userDefault))
        navigate('/')
    }

    return (
        <PerfilUserStyle >
            <ModalPhoto isOpen={isModalOpen} onClose={handleModalClose}>
                {selectedImage && <img style={{ width: '190px' }} src={selectedImage} alt="Imagem selecionada" />}
                <form onSubmit={handleClick} className='form'>
                    <input className='form-file' type={'file'} accept="image/*" onChange={handleImageChange}></input>
                    <ButtonConfirm type={'submit'} value={'Atualizar foto'}></ButtonConfirm>
                    <ButtonCancel onClick={handleModalClose} value={'Cancelar'}></ButtonCancel>
                </form>
            </ModalPhoto>
            <p className='perfil-info'>Clique na foto para editar.</p>
            <PhotoHoverStyle className='perfil-photo' onClick={handleModalOpen}>
                <img className='perfil-photo' src={!image ? user.photo : image}></img>
            </PhotoHoverStyle>
            <div className='names'>
                <h1 className='perfil-name' style={{ color: theme.color }}>{user.userName}</h1>
                <p>@{user.name}</p>
            </div>
            <nav >
                <Link to={'/perfil/' + user.name + '/' + user.id} style={{ color: theme.color }}><HiUser/> Perfil</Link>
                <Link to={'/notifications'} style={{ color: theme.color }}  className='notifications'><IoIosNotifications /> Notificações {notificationLength !== 0 && <span className='notifications-span'>{notificationLength}</span>}</Link>
                <p onClick={() => handleLogout()} style={{ color: theme.color }}><RiLogoutBoxRFill/>  Logout</p>
            </nav>
            <ToastContainer position='bottom-left' />
        </PerfilUserStyle>
    )
}

const PhotoHoverStyle = styled.div`
        width: 170px;
        cursor: pointer;
        transition: .7s;
        position: relative;
        overflow: hidden;
        img{
            width: 100%;
        }
        &:hover{
            filter: grayscale(100%);
        }
            
        &::after{
            content: '';
            position: absolute;
            background-image: url('https://cdn-icons-png.flaticon.com/512/1827/1827951.png');
            background-size: cover;
            display: none;
            width: 20px;
            height: 20px;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: 5;
        }
            
        &:hover::after{
            display: block;
        }
`

const PerfilUserStyle = styled.section`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    margin: 50px 15px;
    max-height: 350px;
    padding: 10px;
    color: #fff;
    .names{
        display: flex;
        align-items: flex-end;
        margin-top: 20px;
    }
    nav{
        .notifications{
            position: relative;
        }
        .notifications-span{
            position: absolute;
            top: 0;
            left: 0 ;
            border-radius: 50%;
            background-color: #e71111;
            padding: 2px 7px;
            animation: pulsing infinite ease forwards 3s;

        }
        a, p{
            color: #fff;
            cursor: pointer;
            margin: 5px 0;
            font-size: 10px;
            transition: .3s;
            display: flex;
            align-items: center;
            border-radius: 8px;
            padding: 3px;
            &:hover{
                background-color: #222EEE;
            }
        }
        svg{
            font-size: 25px;
        }
    }
    p{
        font-size: 10px;
        color: gray;
        margin-left: 3px;
        margin-bottom: 4px;
    }     
    h1{
        font-size: 25px;    
        color: #fff;
        text-shadow: 0 0 2px black;
    }
    h2{
        font-size: 13px;
    }

    form{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    @media ( max-width: 900px ){
        display: none;
    }      


    @keyframes pulsing{
        0%{
            transform: scale(0.9);
        }
        50%{
            transform: scale(1.2);
        }
        100%{
            transform: scale(0.9);
        }
    }
    
`