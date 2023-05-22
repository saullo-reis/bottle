import { Header } from "../headerAndFooter/header/Header"
import { Footer } from "../headerAndFooter/footer/Footer"
import { PerfilPosts } from "./posts/Posts"
import { PerfilFriends } from "./friends/Friends"
import { PerfilUser } from "./user/User"
import './styles.sass'

export const Perfil = () => {

    return (
        <>
            <Header />
            <section className="perfil-user">
                <div style={{display: 'flex', alignItems: 'center', flexDirection: 'column', width: '40%'}}>
                    <PerfilUser />
                    <PerfilFriends />
                </div>
                <PerfilPosts />
            </section>
            <Footer />
        </>
    )
}