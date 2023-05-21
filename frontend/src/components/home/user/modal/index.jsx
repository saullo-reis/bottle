import React from 'react';
import './UserModal.sass'

function ModalPhoto(props) {
    const { isOpen, onClose, children } = props;

    if (!isOpen) {
        return null;
    }

    return (
        <div className="modal-overlay">
            <div className='modal'>
                <button className="modal-close-button" style={{color: 'red'}} onClick={onClose}>X</button>
                <div className="modal-content">
                    {children}
                </div>
            </div>
        </div>
    );
}

export default ModalPhoto;