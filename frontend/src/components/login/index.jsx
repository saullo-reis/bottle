import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { ButtonConfirm } from '../../styles/stylesComponents'
import { LoginAndRegister } from '../../styles/stylesComponents';


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