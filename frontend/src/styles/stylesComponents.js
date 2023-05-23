import { styled } from "styled-components"

const Modal = styled.div`
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
    border-radius: 5px;
    text-align: center;
    box-shadow: 4px 4px 0 black;
    border: solid 1px black;
`

const ModalOverlay = styled.div`
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
    margin: 30px;
    cursor: pointer;
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
    margin: 55px;
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

export { ButtonCancel, ButtonConfirm, Modal, ModalOverlay, TextArea }