import { Header } from "../headerAndFooter/header/Header"
import { Footer } from "../headerAndFooter/footer/Footer"
import { PerfilPosts } from "./posts/Posts"
import { PerfilFollow } from "./follows/Follows"
import { PerfilUser } from "./user/User"
import { useContext } from "react"
import { ThemeContext } from "../../theme-context/theme"

export const Perfil = () => {
    const { theme } = useContext(ThemeContext)
    return (
        <>
            <Header />
            <section style={{ display: 'flex', backgroundColor: theme.background2, minHeight: '100vh'}}>
                <div style={{display: 'flex', alignItems: 'center', flexDirection: 'column', width: '40%'}}>
                    <PerfilUser />
                    <PerfilFollow />
                </div>
                <PerfilPosts />
            </section>
            <Footer />
        </>
    )
}