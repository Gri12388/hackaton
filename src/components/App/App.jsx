import React, { createContext, useEffect, useState } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';

import { useCourseClick } from '../../data/hooks.jsx';

import sprite from '../../assets/images/sprite.svg';
 
import c from '../../assets/styles/common.scss';
import s from './app.scss';

export const AppContext = createContext({});

function App() {

  const location = useLocation();
  const navigate = useNavigate();
  const onCourseClick = useCourseClick();

  useEffect(() => {
    if (localStorage.key(0)) localStorage.clear();
  });

  function onLogoClick() {
    if (location.pathname !== '/') navigate('/');
  } 

  return(
  <div className={ s.container }>
    <header className={ s.header }>
      <div className={ s.headerLeft }>
        <div className={ `${s.logo} ${c.pointer}`  } onClick={ onLogoClick }>LOGO HERE</div>
        <div className={ s.headerCourses }>
          <div className={ s.link } onClick={ onCourseClick }>Курсы</div>
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
        <div className={ `${s.logo} ${c.pointer}` } onClick={ onLogoClick }>LOGO HERE</div>
        <div className={ s.subcontainer }>
          <a className={ s.phone } href='tel:+78005553535' >8 800 555 35 35</a>
          <a className={ s.email } href='mailto:404.study@proj.ru'  >404.study@proj.ru</a>
        </div>
      </div>

      <div className={ s.footerRight }>
        <div className={ `${s.link} ${s.gap}` } onClick={ onCourseClick } >Курсы</div>
        <div className={ s.link }>Прогресс</div>
        <div className={ s.link }>О компании</div>
      </div>
    </footer>
  </div>
  );
}

export default App;