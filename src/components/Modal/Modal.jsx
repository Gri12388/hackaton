import React from 'react';

import {
  modalModes,
} from '../../data/data.js';

import c from '../../assets/styles/common.scss';
import s from './modal.scss';

import loadingPic from '../../assets/images/loading.svg';

function Modal({  
  modalMode, 
  setModalMode, 
  modalMessage, 
  setModalMessage 
}) {

  function hideModal() {
    setModalMessage('');
    setModalMode(modalModes.hidden);
  }

  return (
    <div className={ s.background }>
      <div className={ s.foreground }>
        { modalMode === modalModes.loading && <img src={ loadingPic } alt='loadingPic' className={ s.loadingPic } /> }
        { modalMode === modalModes.messsage && 
          <>
            <p className={ s.messageText }>{ modalMessage }</p>
            <button className={ `${c.button2} ${s.button}` } 
                    onClick={ hideModal }>OK</button>  
          </>
        }
      </div>
    </div>
  );
}

export default Modal;