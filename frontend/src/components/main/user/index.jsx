import axios from 'axios'
import ModalPhoto from './modal'
import { useState, useEffect } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ButtonConfirm } from '../../../styles/stylesComponents'
import { styled } from 'styled-components'

export const Perfil = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [image, setImage] = useState('')
    const user = JSON.parse(localStorage.getItem('user'));
    const navigate = useNavigate()

    useEffect(() => {
        if (!user.name) navigate('/')
        async function fetchData() {
            try {
                const response = await axios.get('http://localhost:3333/getUser/', {
                    params: {
                        name: user.name
                    }
                })
                localStorage.setItem('user', JSON.stringify(response.data)) // Armazena os dados atualizados do usuário no localStorage
            } catch (err) {
                console.error(err)
            }
        }
        fetchData();
    }, [image]);

    async function handleClick(e) {
        e.preventDefault()
        try {
            await axios.put('http://localhost:3333/update/' + user.id, {
                photo: selectedImage
            })
            setIsModalOpen(false);
            toast.success('Foto atualizada com sucesso!')
            setImage(selectedImage)
        } catch (err) {
            if (err.message === 'Request failed with status code 413') {
                toast.error('Imagem muito grande')
            }
            console.error(err.message)
        }

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

    return (
        <PerfilUserStyle>
            <ModalPhoto isOpen={isModalOpen} onClose={handleModalClose}>
                {selectedImage && <img style={{ width: '190px' }} src={selectedImage} alt="Imagem selecionada" />}
                <form onSubmit={handleClick} className='form'>
                    <input className='form-file' type={'file'} accept="image/*" onChange={handleImageChange}></input>
                    <ButtonConfirm type={'submit'} value={'Atualizar foto'}></ButtonConfirm>
                </form>
            </ModalPhoto>
            <p className='perfil-info'>Clique na foto para editar.</p>
            <PhotoHoverStyle className='perfil-photo' onClick={handleModalOpen}>
                <img className='perfil-photo' src={!image ? user.photo : image}></img>
            </PhotoHoverStyle>
            <h1 className='perfil-name'>{user.name}</h1>
            <h2 className='perfil-email'>Email: {user.email}</h2>
            <ToastContainer position='bottom-left' />
        </PerfilUserStyle>
    )
}

const PhotoHoverStyle = styled.div`
        width: 200px;
        cursor: pointer;
        border-radius: 8px;
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
    align-items: center;
    justify-content: flex-start;
    margin: 20px;
    box-shadow: 4px 4px 0 black;
    border: solid 1px black;
    border-radius: 8px;
    max-height: 350px;
    padding: 10px;
    background-color: #121212;
    color: #fff;
    text-align: center;
    p{
        font-size: 10px;
        color: gray;
    }     
    h1{
        font-size: 25px;
        margin: 20px 0;
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
    
`