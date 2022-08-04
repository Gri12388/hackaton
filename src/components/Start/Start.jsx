import React, { useContext, useState } from 'react';

import LoginForm from '../LoginForm/LoginForm.jsx';
import RegForm from '../RegForm/RegForm.jsx';
import { AppContext } from '../App/App.jsx';

import {
  languages,
} from '../../data/data.js';

import c from '../../assets/styles/common.scss';
import s from './start.scss';

function Start() {

  const context = useContext(AppContext);
  
  const [isLoginForm, setIsLoginForm] = useState(true);

  function changeFormMode() {
    setIsLoginForm(state => !state);
  }

  return (
    <div className={ c.container }>
      <main className={ s.main }>
        <div className={ s.left }></div>
        <div className={ s.right }>
          { isLoginForm && <div className={ s.mainLogo } ></div>}
          <section className={ s.loginFormSection }>
            { isLoginForm ? <LoginForm /> : <RegForm /> }
          </section>
          <p 
            className={ s.link } 
            onClick={ changeFormMode }
          >{ isLoginForm ? languages.register[context.language] : languages.back[context.language] }</p>
        </div>
      </main>
      <footer className={ s.footer }></footer>
    </div>
  );
}

export default Start;