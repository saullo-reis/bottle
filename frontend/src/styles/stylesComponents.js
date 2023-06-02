import { styled } from "styled-components"

const Modal = styled.aside`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    padding: 20px;
    width: 70%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background-color: #2f2e2e;
    border-radius: 5px;
    color: #fff;
    text-align: center;
    box-shadow: 4px 4px 0 black;
    border: solid 1px black;
`

const ModalOverlay = styled.aside`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 9999;
`

const ButtonCancel = styled.input`
    width: 150px;
    height: 35px;
    border: none;
    border-radius: 8px;
    color: #fff;
    background-color: #ff2020;
    margin: 10px;
    cursor: pointer;
    text-align: center;
    transition: 1s;
    box-shadow: 5px 5px 0px #000000;
    border: 1px solid #000000;
    &:hover{
        transform: scale(0.95);
        box-shadow: 2px 2px 0 black;
    }
`

const ButtonConfirm = styled.input`
    width: 150px;
    height: 35px;
    border: none;
    border-radius: 8px;
    color: #fff;
    background-color: #2218e0;
    margin: 10px;
    cursor: pointer;
    transition: 1s;
    box-shadow: 5px 5px 0px #000000;
    border: 1px solid #000000;
    &:hover{
        transform: scale(0.95);
        box-shadow: 2px 2px 0 black;
    }
`

const TextArea = styled.textarea`
    background-color: #ccc;
    border: none;
    height: 130px ;
    padding: 5px;
    box-shadow: 4px 4px 0 black;
    resize: none;
    border: solid 1px black;
    &:focus{
        outline: solid 2px #2218e0;
    }
`

const LoginAndRegister = styled.section`
    width: 100%;
    display: flex;
    height: 100vh;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background-color: #2f2e2e;
    h1{
        color: #2218e0;
        text-shadow: 0 0 3px black;
        font-weight: 700;
        font-size: 35px;
        position: absolute;
        animation: slide .7s ease;
        margin-bottom: 20px;
    }
    main{
        background-color: #121212;
        border-radius: 8px;
        box-shadow: 1px 1px 5px black;
        width: 320px;
        z-index: 3;
        display: flex;
        position: absolute;
        padding: 50px;
        height: 320px;
        flex-direction: column;
        box-shadow: 5px 5px 0px #000000;
        border: 1px solid #000000;
        align-items: center;
        justify-content: center;
        animation: slide .7s ease;
        h2{
            color: #fff;
            text-shadow: 0 0 3px black;
        }
        a{
            margin-top: 20px;
            color: gray;
            font-size: 10px;
        }
        form{
            display: flex;
            flex-direction: column;
            width: 100%;
            align-items: center;
            justify-content: flex-start;
            input{
                border: none;
                box-shadow: 4px 4px 0 black;
                border: 1px solid #000000;
                width: 90%;
                padding: 10px;
                border-radius: 8px;
                margin: 30px 14px 0;
                &:focus{
                    
                    outline: none
                }
            }  
        }
    }    
    @keyframes slide{
        0%{
            transform: translateX(-200px);
            opacity: 0;
        }
        100%{
            transform: translateX(0);
            opacity: 1;
        }  
    }
    
`

const PostsStyle = styled.ul`
    display: flex;
    flex-direction: column;
    border: solid 1px black;
    padding: 50px 15px;
    li{
        box-shadow: 4px 4px 0 black;
        margin: 40px 0;
        border: #000 solid 1px;
        border-radius: 9px;
        min-height: 230px;
        background-color: #121212;
        color: #fff;
        div{
            display: flex;
            align-items: center;
            background-color: #2218e0;
            border-bottom: #000 solid 1px;
            border-top-left-radius: 8px;
            border-top-right-radius: 8px;
            color: white;
            font-weight: 700;
            justify-content: center;
            padding: 5px;
            .ball{
                background-color:#fff;
                width: .6rem;
                height: .6rem;
                position: relative;
                border-radius: 50%;
                margin: 5px;
                &::after{
                    content: "";
                    width: .6rem;
                    height: .6rem;
                    right: -20px;
                    position: absolute;
                    background: white;
                    border-radius: 50%;

                }
                &::before{
                    content: "";
                    width: .6rem;
                    height: .6rem;
                    left: -20px;
                    position: absolute;
                    background: white;
                    border-radius: 50%;
                }
            }
            img{
                width: 30px;
                border-radius: 100%;
            }
            h3{
                color: gray;
                margin: 0 5px;
            }
            p{
                color: #acacac;
                font-size: 12px;
                margin-left: auto;
                margin-right: 20px;
            }
            svg{
                cursor: pointer;
                font-size: 25px;
            }
        }
        p{
          padding: 5px;  
        }
    }
`

export { ButtonCancel, ButtonConfirm, Modal, ModalOverlay, TextArea, LoginAndRegister, PostsStyle }