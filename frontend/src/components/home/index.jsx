import { Footer } from "../headerAndFooter/footer/Footer"
import { Header } from "../headerAndFooter/header/Header"
import { Perfil } from "./user"
import { Posts } from "./posts"
import './style.sass'
import { FriendsAdd } from "./friends/Friends"

export const Home = () => {
    return(
        <section className="home" >
            <Header/>
            <main className="container">
                <Perfil/>
                <Posts />
                <FriendsAdd/>
            </main>
            <Footer/>    
        </section>
    )
}