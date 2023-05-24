import { useState } from 'react'
import '../Styles.sass'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import { sha256 } from 'js-sha256'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { ButtonConfirm } from '../../../styles/stylesComponents'

export const Register = () => {
    const navigate = useNavigate()
    const [data, setData] = useState({
        email: '',
        password: '',
        name: ''
    })

    async function handleSubmit(e) {
        e.preventDefault()
        if (data.email === '' || data.password === '') {
            toast.error('Preencha todos os campos.')
            return
        }

        try{
            await axios.post('http://localhost:3333/register', {
                email: data.email,
                name: data.name,
                password: sha256(data.password),
                photo: 'https://www.promoview.com.br/uploads/images/unnamed%2819%29.png'
            })
            toast.success(`Usuário ${data.name} cadastrado com sucesso.`)
            setTimeout(() => {
                navigate('/')
            }, 3000)
            return
        }catch(err){
            switch (err.request.status){
                case 500:
                    toast.error(`Problema no servidor, reinicie a página.`)
                    return
                case 401:
                    if (err.response.data.error === "SQLITE_CONSTRAINT: UNIQUE constraint failed: users.email") {
                        toast.error('Email ja registrado')
                        return
                    }
                    toast.error('Nome de usuário ja registrado.')
                    return
            }
        }
    }

    return (
        <section className="login">
            <h1 className="login-title">Bottle</h1>
            <ToastContainer position='bottom-left' />
            <main className="login-container">
                <h2 className="login-container-title">Registrar</h2>
                <form className="login-container-form" onSubmit={handleSubmit}>
                    <input type={'email'} placeholder={"Email"} onChange={(e) => setData({ email: e.target.value, password: data.password, name: data.name })} ></input>
                    <input type={'text'} placeholder={"Nome"} onChange={(e) => setData({ email: data.email, password: data.password, name: e.target.value })} ></input>
                    <input type={'password'} placeholder={"Senha"} onChange={(e) => setData({ password: e.target.value, email: data.email, name: data.name })} ></input>
                    <ButtonConfirm style={{ width: '120px' }} className='button' type={'submit'} value={'Registrar'}></ButtonConfirm>
                </form>
                <Link to={'/'}>Login</Link>
            </main>

        </section>
    )
}