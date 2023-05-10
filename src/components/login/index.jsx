import { useState } from 'react'
import './StyleLogin.sass'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'

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

            if (response.status === 200) {
                navigate('/home', { replace: true })
            }
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <section className="login">
            <h1 className="login-title">Bottle</h1>
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