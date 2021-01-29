import { useEffect } from 'react';
import {createPortal} from 'react-dom';
import PropTypes from 'prop-types';

import s from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export default function Modal({children, onClose}) {
    
    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown)

        return () => {window.removeEventListener('keydown', handleKeyDown)}
    })

    function handleKeyDown(e) {
        if (e.code === 'Escape') {
            console.log(e.code);
            // onClose()
        }
    }

    function handleClickBackdrop(e)  {
        if(e.target === e.currentTarget) {
            onClose()
        }
    }

    return createPortal(
        <div className={s.ModalBackdrop} onClick={handleClickBackdrop}>
            <div className={s.ModalContent}>
                {children}  
            </div>
        </div>, modalRoot)

}

Modal.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.object,), PropTypes.element]),
    onClose: PropTypes.func,
}
