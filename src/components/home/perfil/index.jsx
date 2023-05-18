import axios from 'axios'
import { useSelector } from 'react-redux'
import './PerfilStyle.sass'
import ModalPhoto from './modal'
import { useState } from 'react'
import { useEffect } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import React from 'react'

export const Perfil = () => {
    const data = useSelector((state) => state.data)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [image, setImage] = useState('')

    useEffect(() => {
        console.log('.')
    },[data.photo])

    async function handleClick(e) {
        e.preventDefault()
        try{
            await axios.put('http://localhost:3333/update/' + data.id, {
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
            <div className='perfil-photo' onClick={handleModalOpen}>
                {!data.photo ? <img className='perfil-photo' src='https://www.promoview.com.br/uploads/images/unnamed%2819%29.png'></img> : <img className='perfil-photo' src={!image ? data.photo : image}></img>}
                
            </div>
            <h1 className='perfil-name'>Nome: {data.name}</h1>
            <h2 className='perfil-email'>Email: {data.email}</h2>
            <ToastContainer position='bottom-left'/>
        </section>
    )
}