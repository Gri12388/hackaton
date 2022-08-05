import React, { createContext, useEffect, useState } from 'react';
import { Outlet, Link } from 'react-router-dom';

import Modal from '../Modal/Modal.jsx';

import { 
  languages,
  modalModes,
 } from '../../data/data.js';

import s from './app.scss';

export const AppContext = createContext({});

function App() {
  return(
  <div className={ s.container }>
    <header className={ s.header }>
      <div className={ s.logo }></div>
      <div className={ s.link }>Курсы</div>
      <div className={ s.link }>Прогресс</div>
      <div className={ s.bell }></div>
      <Link to='auth' className={ s.log }>Вход</Link>
      <Link to='reg' className={ s.reg }>Регистрация</Link>
    </header>
    <main className={ s.main }>
      <Outlet />
    </main>
    <footer className={ s.footer }>
      <div className={ s.logo }></div>
      <div className={ s.subcontainer }>
        <div className={ s.phone }>8 800 555 35 35</div>
        <div className={ s.email }>404.study@proj.ru</div>
      </div>
      <div className={ `${s.link} ${s.gap}` }>Курсы</div>
      <div className={ s.link }>Прогресс</div>
      <div className={ s.link }>О компании</div>
    </footer>
  </div>
  );
  
}

export default App;