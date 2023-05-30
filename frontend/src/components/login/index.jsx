import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { ButtonConfirm } from '../../styles/stylesComponents'
import styled from 'styled-components'
import { Drop } from '../home/drops';


export const Login = () => {
    const navigate = useNavigate()
    const [data, setData] = useState({
        email: '',
        password: ''
    })

    async function handleSubmit(e) {
        e.preventDefault()
        if (data.email === '' || data.password === '') {
            alert("Preencha todos os campos")
            return
        }

        try {
            const response = await axios.post('http://localhost:3333/login', {
                email: data.email,
                password: data.password
            })
            localStorage.setItem('user', JSON.stringify(response.data));
            navigate('/Home')
        }
        catch (err) {
            switch (err.request.status) {
                case 500:
                    toast.error(`Problema no servidor, reinicie a página.`)
                    return

                case 401:
                    toast.error('Senha ou email incorretos')
                    return
            }
        }
    }

    return (
        <LoginAndRegister>
            <ToastContainer position='bottom-left' />
            <main>
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <input type={'email'} placeholder={"Email"} onChange={(e) => setData({ email: e.target.value, password: data.password })} ></input>
                    <input type={'password'} placeholder={"Senha"} onChange={(e) => setData({ password: e.target.value, email: data.email })} ></input>
                    <ButtonConfirm style={{width: '120px'}} type={'submit'} value={'Entrar'}></ButtonConfirm>
                </form>
                <Link to={'/register'}>Não tenho conta</Link>
            </main>
        </LoginAndRegister>
    )
}

const LoginAndRegister = styled.section`
    width: 100%;
    display: flex;
    height: 100vh;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background-color: #2f2e2e;
    h1{
        color: #2218e0;
        text-shadow: 0 0 3px black;
        font-weight: 700;
        font-size: 35px;
        position: absolute;
        animation: slide .7s ease;
        margin-bottom: 20px;
    }
    main{
        background-color: #121212;
        border-radius: 8px;
        box-shadow: 1px 1px 5px black;
        width: 320px;
        z-index: 3;
        display: flex;
        position: absolute;
        padding: 50px;
        height: 320px;
        flex-direction: column;
        box-shadow: 5px 5px 0px #000000;
        border: 1px solid #000000;
        align-items: center;
        justify-content: center;
        animation: slide .7s ease;
        h2{
            color: #fff;
            text-shadow: 0 0 3px black;
        }
        a{
            margin-top: 20px;
            color: gray;
            font-size: 10px
        }
        form{
            display: flex;
            flex-direction: column;
            width: 100%;
            align-items: center;
            justify-content: flex-start;
            input{
                border: none;
                box-shadow: 4px 4px 0 black;
                border: 1px solid #000000;
                width: 90%;
                padding: 10px;
                border-radius: 8px;
                margin: 30px 14px 0;
                &:focus{
                    
                    outline: none
                }
            }  
        }
    }    
    @keyframes slide{
        0%{
            transform: translateX(200px);
            opacity: 0;
        }
        100%{
            transform: translateX(0);
            opacity: 1;
        }  
    }
    
`