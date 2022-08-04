import React, { useContext, useState } from 'react';

import { AppContext } from '../App/App.jsx';

import {
  changeLanguage,
  languages,
} from '../../data/data.js';

import c from '../../assets/styles/common.scss';
import s from './base.scss';

function Base() {

  const context = useContext(AppContext);

  const [isCross, setIsCross] = useState(false);

  function onChangeLanguage() {
    changeLanguage(context.language, context.setLanguage);
  }

  function onBurgerClick() {
    setIsCross(state => !state);
  }


  return (
    <div className={ `${c.container} ${s.container}` }>
      <aside className={ isCross ? s.asideCross : s.aside }>
        
        <div className={ s.logoWrapper }></div>

      </aside>
      <main className={ s.main }>
        <header className={ s.header }>
          
          <div className={ s.burgerWrapper } onClick={ onBurgerClick }>
            <div className={ isCross ? `${s.lines} ${s.line1}` : `${s.lines} ${s.line1} ${s.line1Cross}` } />
            <div className={ isCross ? `${s.lines} ${s.line2}` : `${s.lines} ${s.line2} ${s.line2Cross}` } />
            <div className={ isCross ? `${s.lines} ${s.line3}` : `${s.lines} ${s.line3} ${s.line3Cross}` } />
          </div>
          <p  className={ s.lang } 
              onClick={ onChangeLanguage }
          >{ languages.lang[context.language] }</p>
          <div className={ s.avatar }></div>
          <p className={ s.role }>{ languages.student[context.language] }</p>
          <p className={ s.fullName }>Full Name</p>
          <div className={ s.quitWrapper }></div>

        </header>
        <div className={ s.desktop }>
          
        </div>
      </main>
      <div className={ s.modal }></div>
    </div>
  );
}

export default Base;