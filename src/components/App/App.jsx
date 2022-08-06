import React, { createContext, useEffect, useState } from 'react';
import { Outlet, Link } from 'react-router-dom';

import Modal from '../Modal/Modal.jsx';

import sprite from '../../assets/images/sprite.svg';

import { 
  languages,
  modalModes,
 } from '../../data/data.js';

import s from './app.scss';

export const AppContext = createContext({});

function App() {

  async function onCourseClick(e) {
    try {
      const response = await fetch('http://62.109.19.55:8080/api/allCourse', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          mode: 'no-cors',
          referrerPolicy: "unsafe-url",
        },
      });
      console.log(response);

      if (response.status === 200) navigate('/auth');
      else setMessageError('Извините, но зарегистрироваться не удалось. Попробуйте еще раз');
      const result = await response.text();
      console.log(result);
    }
    catch (err) {
      console.error(err);
    }
  }

  return(
  <div className={ s.container }>
    <header className={ s.header }>
      <div className={ s.headerLeft }>
        <div className={ s.logo }></div>
        <div className={ s.headerCourses }>
          <div className={ s.link }>Курсы</div>
          <div className={ s.link }>Прогресс</div>
        </div>
      </div>

      <div className={ s.headerRight }>
        <svg className={ s.bell }>
          <use href={ sprite + `#bellOff` } className={ s.bellOffSvg }></use>
        </svg>
        <Link to='auth' className={ s.log }>Вход</Link>
        <Link to='reg' className={ s.reg }>Регистрация</Link>
      </div>

    </header>
    <main className={ s.main }>
      <Outlet />
    </main>
    <footer className={ s.footer }>
      <div className={ s.footerLeft }>
        <div className={ s.logo }></div>
        <div className={ s.subcontainer }>
          <div className={ s.phone }>8 800 555 35 35</div>
          <div className={ s.email }>404.study@proj.ru</div>
        </div>
      </div>

      <div className={ s.footerRight }>
        <div className={ `${s.link} ${s.gap}` }>Курсы</div>
        <div className={ s.link }>Прогресс</div>
        <div className={ s.link }>О компании</div>
      </div>
    </footer>
  </div>
  );
  
}

export default App;