import React, { createContext, useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

import Modal from '../Modal/Modal.jsx';

import { 
  languages,
  modalModes,
 } from '../../data/data.js';

import s from './app.scss';

export const AppContext = createContext({});

function App() {

  const [language, setLanguage] = useState(sessionStorage.getItem('lang'));
  const [modalMode, setModalMode] = useState(modalModes.hidden);
  const [modalMessage, setModalMessage] = useState('');

  useEffect(() => {
    if (!sessionStorage.getItem('lang')) sessionStorage.setItem('lang', 0);
    setLanguage(+sessionStorage.getItem('lang'));
  }, []);

  console.log (language);

  function turnScrollOff() {
    document.querySelector('body').classList.add(s.body);
    return <Modal modalMode={ modalMode } 
                  setModalMode={ setModalMode } 
                  modalMessage={ modalMessage } 
                  setModalMessage={ setModalMessage } />
  }

  function turnScrollOn() {
    document.querySelector('body').classList.remove(s.body);
  }

  return (
    <AppContext.Provider value={{ language: language, setLanguage: setLanguage }}>
      <Outlet />
      { modalMode !== modalModes.hidden ? turnScrollOff() : turnScrollOn() }
    </AppContext.Provider>
  );
}

export default App;