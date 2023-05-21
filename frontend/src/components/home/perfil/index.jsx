import axios from 'axios'
import { useSelector } from 'react-redux'
import './PerfilStyle.sass'
import ModalPhoto from './modal'
import { useState, useEffect } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import React from 'react'
import { useNavigate } from 'react-router-dom'

export const Perfil = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [image, setImage] = useState('')
    const user = JSON.parse(localStorage.getItem('user'));
    const navigate = useNavigate()
    
    useEffect(() => {
        if(!user) navigate('/')
        async function fetchData() {
            try {
                const response = await axios.get('http://localhost:3333/getUser/', {
                    params: {
                        email: user.email
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
        try{
            await axios.put('http://localhost:3333/update/' + user.id, {
                photo: selectedImage
            })
            setIsModalOpen(false);
            toast.success('Foto atualizada com sucesso!')
            setImage(selectedImage)
        }catch(err){
            if (err.message === 'Request failed with status code 413'){
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
        <section className='perfil'>
            <ModalPhoto isOpen={isModalOpen} onClose={handleModalClose}>
                {selectedImage && <img style={{width: '190px'}} src={selectedImage} alt="Imagem selecionada" />}
                <form onSubmit={handleClick} className='form'>
                    <input className='form-file' type={'file'} accept="image/*" onChange={handleImageChange}></input>
                    <input className='form-submit' type={'submit'} value={'Atualizar foto'}></input>
                </form>
            </ModalPhoto>
            <p className='perfil-info'>Clique na foto para editar.</p>
            <div className='perfil-photo' onClick={handleModalOpen}>
                <img className='perfil-photo' src={!image ? user.photo : image}></img>
            </div>
            <h1 className='perfil-name'>{user.name}</h1>
            <h2 className='perfil-email'>Email: {user.email}</h2>
            <ToastContainer position='bottom-left'/>
        </section>
    )
}