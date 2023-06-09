import { Header } from "../headerAndFooter/header/Header"
import { Footer } from "../headerAndFooter/footer/Footer"
import { PerfilPosts } from "./posts/Posts"
import { PerfilFollow } from "./follows/Follows"
import { PerfilUser } from "./user/User"
import { useContext } from "react"
import { ThemeContext } from "../../theme-context/theme"
import styled from "styled-components"

export const Perfil = () => {
    const { theme } = useContext(ThemeContext)
    return (
        <>
            <Header />
            <PerfilStyle style={{ backgroundColor: theme.background2}}>
                <div style={{display: 'flex', alignItems: 'center', flexDirection: 'column', width: '40%'}}>
                    <PerfilUser />
                    <PerfilFollow />
                </div>
                <PerfilPosts />
            </PerfilStyle>
            <Footer />
        </>
    )
}

const PerfilStyle = styled.section`
    display: flex;
    min-height: 100vh;
    @media(max-width: 740px) {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
`