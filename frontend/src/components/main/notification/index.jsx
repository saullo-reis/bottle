import { Footer } from "../../headerAndFooter/footer/Footer"
import { Header } from "../../headerAndFooter/header/Header"
import { Perfil } from "../user/index"
import { FollowAdd } from "../container-peoples/container-peoples"
import { styled } from "styled-components"
import { Notification } from "./notification"
import { useContext } from "react"
import { ThemeContext } from "../../../theme-context/theme"

export const Notifications = () => {
    const { theme } = useContext(ThemeContext)
    return (
        <MainStyle style={{backgroundColor: theme.background2}}>
            <Header />
            <main>
                <Perfil />
                <Notification/>
                <FollowAdd />
            </main>
            <Footer />
        </MainStyle>
    )
}

const MainStyle = styled.section`
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    align-items: center;
    min-height: 80vh;
    main{
        min-height: 88vh;
        display: flex;
        justify-content: space-between;
        width: 93vw;
    }

    @media ( max-width: 800px ){
        main{
            width: 100vw;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
        }  
    }      
`