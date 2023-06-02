import axios from 'axios'
import { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import styled from 'styled-components'
import { ButtonCancel, ButtonConfirm, Modal, ModalOverlay } from '../../../styles/stylesComponents'
const userLocal = JSON.parse(localStorage.getItem('user'))


export const PerfilUser = () => {
    const { name, id } = useParams()
    const [user, setUser] = useState()
    const [modal, setModal] = useState(false)
    const [editUser, setEditUser] = useState({
        name: userLocal.name,
        photo: userLocal.photo,
        password: '',
    })
    const [newPassword, setNewPassword] = useState({
        input1: '',
        input2: ''
    })

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get('http://localhost:3333/getUser/' + id)
                localStorage.setItem('user', JSON.stringify(response.data))
                setUser(response.data)
            } catch (err) {
                console.error(err)
            }
        }
        fetchData()
    }, [id, modal])

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();

            reader.onload = () => {
                setEditUser({
                    name: editUser.name,
                    photo: reader.result,
                    password: editUser.password
                });
            };

            reader.readAsDataURL(file);
        }

    };

    const handleOpenModal = () => modal === false ? setModal(true) : setModal(false)

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

    const updateEdits = async (e) => {
        e.preventDefault()
        try {
            if(editUser.photo !== userLocal.photo){
                resizeImage(editUser.photo, 300, 300)
                    .then((resizedImage) => {
                        axios.put('http://localhost:3333/update/' + id, {
                            photo: resizedImage
                        })
                        setModal(false)
                        toast.success('Foto atualizada com sucesso!')
                        setImage(resizedImage)
                    })
                    .catch((err) => {
                        if (err.message === 'Request failed with status code 413') {
                            toast.error('Imagem muito grande')
                        }
                        console.error(err.message)
                    })
            }
            // if(editUser.name !== userLocal.name){
            //     axios.put('http://localhost:3333/editProfileName/' + id, {
            //         name: editUser.name
            //     })
            //     axios.put(`http://localhost:3333/editProfilePosts/${editUser.name}/${id}`)
            //     toast.success('Nome atualizado!')
            // }
            if (newPassword.input1 !== newPassword.input2) {
                toast.error('As novas senhas não são iguais!')
                return
            }
            if(editUser.password !== ''){
                await axios.put(`http://localhost:3333/editProfilePassword/${id}`, {
                    password: editUser.password,
                    newPassword1: newPassword.input1,
                    newPassword2: newPassword.input2
                })
                toast.success('Senha atualizada com sucesso!')
                setModal(false)
            }
        } catch (err) {
            toast.error('Senha errada')
            console.error(err)
        }

    }

    return (
        <PerfilUserStyle style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', margin: '20px' }}>
            <img src={user?.photo}></img>
            <div className='container'>
                <p>{name}</p>
                {userLocal.name === name && <button onClick={handleOpenModal} >Editar perfil</button>}
            </div>
            {
                modal &&
                <ModalOverlay>
                    <Modal>
                        <Form onSubmit={updateEdits}>
                            <label htmlFor='image' className='input-file'><img src={editUser.photo}></img></label>
                            <input id='image' accept="image/*" type={'file'} onChange={handleImageChange}></input>
                            <label>Editar senha:</label>
                            <input className='inputs' onChange={(e) => setEditUser({
                                name: editUser.name,
                                photo: editUser.photo,
                                password: e.target.value
                            })} placeholder='Senha atual' type={'password'}></input>
                            <input className='inputs' onChange={(e) => setNewPassword({
                                input1: newPassword.input1,
                                input2: e.target.value
                            })} placeholder='Nova senha' type={'password'}></input>
                            <input className='inputs' onChange={(e) => setNewPassword({
                                input1: e.target.value,
                                input2: newPassword.input2
                            })} placeholder='Repita a nova senha' type={'password'}></input>
                            <div>
                                <ButtonConfirm type='submit' value={'Confirmar'}></ButtonConfirm>
                                <ButtonCancel type="button" value={'Cancelar'} onClick={() => handleOpenModal()}></ButtonCancel>
                            </div>
                        </Form>

                    </Modal>
                </ModalOverlay>
            }
        </PerfilUserStyle>

    )
}

const Form = styled.form`
    display: flex;
    flex-direction: column;
    font-size: 12px;
    div{
        height: 100px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    label{
         color: gray;
         align-self:flex-start ;
    }
    .inputs{
        border: solid 1px #ccc;
        padding: 5px;
        border-radius: 32px;
        margin-bottom: 10px;

    }
    .input-file{
        width: 100px;
        display: flex;
        height: 100px;
        align-self: center;
        transition: .7s;
        position: relative;
        cursor: pointer;
        img{
            width: 100px;
            &:hover{
            filter: grayscale(50%);
        } 
        }
        &::after{
            content: '';
            position: absolute;
            background-image: url('https://pt.seaicons.com/wp-content/uploads/2015/11/Programming-Edit-Property-icon.png');
            background-size: cover;
            width: 20px;
            height: 20px;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: 5;
            }
        }   
        
    input[type='file']{
        display: none;
    }
`


const PerfilUserStyle = styled.aside`
    display: flex;
    margin: 20px;
    padding: 50px 15px 0;
    img{
        width: 150px;
        border-radius: 50%;
    }
    .container{
        margin: 10px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        text-align: center;
        width: 100%;
        p{
            font-weight: 700;
            color: #fff
        }
        button{
            border: none;
            background-color: #121212;
            color: #fff;
            padding: 8px;
            border-radius: 32px;
            font-size: 10px;
            cursor: pointer;
            transition: .3s;
            &:hover{
                background-color: #2222EE;
            }
        }
    }

`