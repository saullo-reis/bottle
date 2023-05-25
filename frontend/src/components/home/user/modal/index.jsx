import React from 'react';
import { styled } from 'styled-components';

function ModalPhoto(props) {
    const { isOpen, onClose, children } = props;

    if (!isOpen) {
        return null;
    }

    return (
        <ModalStyles>
            <div>
                <button style={{color: 'red'}} onClick={onClose}>X</button>
                <div>
                    {children}
                </div>
            </div>
        </ModalStyles>
    );
}

const ModalStyles = styled.aside`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 2;
    div{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: white;
        padding: 20px;
        border-radius: 5px;
        z-index: 5;
        button{
            position: absolute;
            top: 10px;
            right: 10px;
            font-size: 20px;
            font-weight: bold;
            background-color: transparent;
            border: none;
            cursor: pointer;
        }
        div{
            margin-top: 20px;
        }
    }
`

export default ModalPhoto;