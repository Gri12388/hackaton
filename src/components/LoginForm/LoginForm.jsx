import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCourseClick } from '../../data/hooks.jsx';

import { AppContext } from '../App/App.jsx';
import InputText from '../InputText/InputText.jsx';

import { 
  checkEmail,
  checkIfAllValid,
  checkPassword,
  validationErrors,
 } from '../../data/data.js';

import s from './loginForm.scss';

function LoginForm() {

  const context = useContext(AppContext); 
  const navigate = useNavigate();
  const onCourseClick = useCourseClick();

  const [email, setEmail] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [emailError, setEmailError] = useState(validationErrors.emailErrors.noEmail);

  const [password, setPassword] = useState('');
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [passwordError, setPasswordError] = useState(validationErrors.passwordErrors.noPassword);

  const [isAllValid, setIsAllValid] = useState(false);

  const [focusedElement, setFocusedElement] = useState(0);

  const [messageError, setMessageError] = useState('');

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

  async function onSubmitHandler(e) {
    e.preventDefault();
    try {
      let query = 'http://62.109.19.55:8080/api/auth';
      query = query + `/${email}/${password}`
      const response = await fetch(query, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          mode: 'no-cors',
          referrerPolicy: "unsafe-url",
        },
        body: {}
      });
      console.log(response);

      if (response.status !== 200) {
        setMessageError('Извините, но Вы не зарегистрированы. Попробуйте еще раз.');
        return;
      }
      else {
        const temp = await response.text() 
        sessionStorage.setItem('courseId', temp);
      } 
      debugger     
      await onCourseClick();
    }
    catch (err) {
      console.error(err);
    }
  }



  return (
    <div className={ s.background }>
      <div className={ s.container }>
      <p className={ s.auth }>Авторизация</p>
      <p className={ s.messageError }>{ messageError }</p>
      <form onSubmit={ preventDefault }>
        <div>
          <InputText 
            id='loginForm__email__id'
            placeholder={ 'Введите e-mail' }
            setContent={ setEmail }
            isContentValid={ isEmailValid }
            checkContent={ checkEmail.bind(null, setIsEmailValid, setEmailError) }
            contentError={ emailError }
            onKeyDownHandler={ onKeyDownHandler }
            autofocus={ true }
            focus={ focusedElement === 0 }
          />
        </div>

        <div className={ s.gap }>
          <InputText 
            id='loginForm__password__id'
            type='password'
            placeholder={ 'Введите пароль' }
            setContent={ setPassword }
            isContentValid={ isPasswordValid }
            checkContent={ checkPassword.bind(null, setIsPasswordValid, setPasswordError) }
            contentError={ passwordError }
            onKeyDownHandler={ onKeyDownHandler }
            focus={ focusedElement === 1 }
          />
        </div>

        <div className={ s.buttonWrapper }>
          <button 
            className={ isAllValid ? s.button : s.buttonInactiv }
            onClick={ onSubmitHandler }
          >Войти</button>
        </div>
      </form>
      </div>
    </div>
  );
}

export default LoginForm;