import axios from 'axios'
import { useState } from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { ButtonCancel, ButtonConfirm, Modal, ModalOverlay } from '../../../styles/stylesComponents'
const userLocal = JSON.parse(localStorage.getItem('user'))

export const PerfilUser = () => {
    const { name } = useParams()
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
            const response = await axios.get('http://localhost:3333/getUser', {
                params: {
                    name: name
                }
            })
            setUser(response.data)
        }
        fetchData()
    }, [name])

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        console.log(file, 'aqui')
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
    const updateEdits = () => {
        
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
                        <Form onSubmit={{updateEdits}}>
                            <label htmlFor='image' className='input-file'><img src={editUser.photo}></img></label>
                                <input id='image' accept="image/*" type={'file'} onChange={handleImageChange}></input>
                            <label>Editar nome:</label>
                                <input className='inputs' value={editUser.name} onChange={(e) => setEditUser({
                                name: e.target.value,
                                photo: editUser.photo,
                                password: editUser.password
                            })} type={'text'}></input>
                            <label>Editar senha:</label>
                            <input className='inputs' onChange={(e) => setEditUser({
                                name: editUser.name,
                                photo: editUser.photo,
                                password: editUser.password
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