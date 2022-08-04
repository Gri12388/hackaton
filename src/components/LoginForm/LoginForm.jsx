import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { AppContext } from '../App/App.jsx';
import InputText from '../InputText/InputText.jsx';

import { 
  checkEmail,
  checkIfAllValid,
  checkPassword,
  languages,
  validationErrors,
 } from '../../data/data.js';

import s from './loginForm.scss';

function LoginForm() {

  const context = useContext(AppContext); 
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [emailError, setEmailError] = useState(validationErrors.emailErrors.noEmail[context.language]);

  const [password, setPassword] = useState('');
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [passwordError, setPasswordError] = useState(validationErrors.passwordErrors.noPassword[context.language]);

  const [isAllValid, setIsAllValid] = useState(false);

  const [focusedElement, setFocusedElement] = useState(0);

  useEffect(() => {
    setIsAllValid(checkIfAllValid([isEmailValid, isPasswordValid]));
  }, [isEmailValid, isPasswordValid]);

  function onKeyDownHandler(e) {
    if (e.code === 'Enter' || e.key === 'Enter') {
      e.preventDefault();
      setFocusedElement(state => (state + 1) % 2);
    }
  }

  function preventDefault(e) {
    e.preventDefault();
    if(isAllValid) onSubmitHandler();
  }

  function onSubmitHandler(e) {
    console.log('hello, I am LoginForm');
    navigate('/app/base');
  }

  //console.log (isAllValid);

  return (
    <form className={ s.container } onSubmit={ preventDefault }>
      <div>
        <InputText 
          id='loginForm__email__id'
          label={ languages.email[context.language] } 
          placeholder={ languages.typeEmail[context.language] }
          setContent={ setEmail }
          isContentValid={ isEmailValid }
          checkContent={ checkEmail.bind(null, setIsEmailValid, setEmailError, context.language) }
          contentError={ emailError }
          onKeyDownHandler={ onKeyDownHandler }
          autofocus={ true }
          focus={ focusedElement === 0 }
        />
      </div>

      <div>
        <InputText 
          id='loginForm__password__id'
          label={ languages.password[context.language] } 
          placeholder={ languages.typePassword[context.language] }
          setContent={ setPassword }
          isContentValid={ isPasswordValid }
          checkContent={ checkPassword.bind(null, setIsPasswordValid, setPasswordError, context.language) }
          contentError={ passwordError }
          onKeyDownHandler={ onKeyDownHandler }
          focus={ focusedElement === 1 }
        />
      </div>

      <div className={ s.buttonWrapper }>
        <button 
          className={ isAllValid ? s.button : s.buttonInactiv }
          onClick={ onSubmitHandler }
        >{ context.language === languages.lang[0] ? languages.login[0] : languages.login[1] }</button>
      </div>
    </form>
  );
}

export default LoginForm;