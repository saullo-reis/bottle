import { Footer } from "../headerAndFooter/footer/Footer"
import { Header } from "../headerAndFooter/header/Header"
import { Perfil } from "./perfil"
import { Posts } from "./posts"
import './style.sass'

export const Home = () => {
    return(
        <section className="home" >
            <Header/>
            <main className="container">
                <Perfil/>
                <Posts />
            </main>
            <Footer/>    
        </section>
    )
}