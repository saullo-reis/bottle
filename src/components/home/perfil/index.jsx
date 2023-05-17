import { useSelector } from 'react-redux'
import './PerfilStyle.sass'

export const Perfil = () => {
    const data = useSelector((state) => state.data)
    return(
        <section className='perfil'>
            <img className='perfil-photo' src='https://i.ibb.co/W0WFcvp/foto-minha-2.jpg'></img>
            <h1 className='perfil-name'>Nome: {data.name}</h1>
            <h2 className='perfil-email'>Email: {data.email}</h2>
        </section>
    )
}