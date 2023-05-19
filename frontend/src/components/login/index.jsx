import { useState } from 'react'
import './Styles.sass'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import { sha256 } from 'js-sha256'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';


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
                password: sha256(data.password)
            })
            localStorage.setItem('user', JSON.stringify(response.data));
            navigate('/Home')
        }
        catch (err) {
            switch (err.request.status) {
                case 500:
                    toast.success(`Problema no servidor, reinicie a página.`)
                    return

                case 401:
                    toast.error('Senha ou email incorretos')
                    return
            }
        }
    }

    return (
        <section className="login">
            <h1 className="login-title">Bottle</h1>
            <ToastContainer position='bottom-left' />
            <main className="login-container">
                <h2 className="login-container-title">Login</h2>
                <form className="login-container-form" onSubmit={handleSubmit}>
                    <input type={'email'} placeholder={"Email"} onChange={(e) => setData({ email: e.target.value, password: data.password })} ></input>
                    <input type={'password'} placeholder={"Senha"} onChange={(e) => setData({ password: e.target.value, email: data.email })} ></input>
                    <input className='button' type={'submit'} value={'Entrar'}></input>
                </form>
                <Link to={'/register'}>Não tenho conta</Link>
            </main>

        </section>
    )
}