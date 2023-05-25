import { styled } from 'styled-components'

export const PerfilFriends = () => {
    return(
        <PerfilFriendsStyle>
            <h1>Amigos</h1>
            <ul className="perfil-friends-container">
                <li className="perfil-friends-container-item">
                    <img src="https://www.promoview.com.br/uploads/images/unnamed%2819%29.png"></img>
                </li >
                <li className="perfil-friends-container-item">
                    <img src="https://www.promoview.com.br/uploads/images/unnamed%2819%29.png"></img>
                </li>
                <li className="perfil-friends-container-item">
                    <img src="https://www.promoview.com.br/uploads/images/unnamed%2819%29.png"></img>
                </li>
                <li className="perfil-friends-container-item">
                    <img src="https://www.promoview.com.br/uploads/images/unnamed%2819%29.png"></img>
                </li>
                <li className="perfil-friends-container-item">
                    <img src="https://www.promoview.com.br/uploads/images/unnamed%2819%29.png"></img>
                </li>
                <li className="perfil-friends-container-item">
                    <img src="https://www.promoview.com.br/uploads/images/unnamed%2819%29.png"></img>
                </li>
                <li className="perfil-friends-container-item">
                    <img src="https://www.promoview.com.br/uploads/images/unnamed%2819%29.png"></img>
                </li>
                <li className="perfil-friends-container-item">
                    <img src="https://www.promoview.com.br/uploads/images/unnamed%2819%29.png"></img>
                </li>
            </ul>
        </PerfilFriendsStyle>
    )
}

const PerfilFriendsStyle = styled.aside`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: white;
    padding: 30px;
    h1{
        background-color: #22e;
        width: 100%;
        padding: 10px 20px;
        border-top-left-radius: 8px;
        border-top-right-radius: 8px;
        text-align: center;
        box-shadow: 4px 4px 0 black;
        border: solid 1px black;
        max-width: 300px;
    }
    ul{
        display: flex;
        flex-flow: row wrap;
        background-color:#D9D9D9;
        width: 100%;
        align-items: center;
        box-shadow: 4px 4px 0 black;
        border: solid 1px black;
        padding: 20px;
        justify-content: center;
        border-bottom-left-radius: 8px;
        border-bottom-right-radius: 8px;
        max-height: 200px;
        max-width: 300px;
        overflow-y: auto;
        li{
            margin: 10px;
            img{
                width: 40px;
            }
                
        }
    }   
`