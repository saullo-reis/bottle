import { Footer } from "../headerAndFooter/footer/Footer"
import { Header } from "../headerAndFooter/header/Header"
import { Perfil } from "./perfil"
import { Posts } from "./posts"

export const Home = () => {
    return(
        <section className="home" >
            <Header/>
            <main style={{ minHeight: '88vh', display: 'flex' }}>
                <Perfil/>
                <Posts />
            </main>
            <Footer/>    
        </section>
    )
}