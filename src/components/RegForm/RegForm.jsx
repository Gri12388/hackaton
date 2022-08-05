import React, { useContext, useEffect, useState } from 'react';

import { AppContext } from '../App/App.jsx';
import InputText from '../InputText/InputText.jsx';

import {
  checkEmail,
  checkIfAllValid,
  checkName,
  checkPassword,
  checkPasswordCopy,
  checkSurname,
  validationErrors,
} from '../../data/data.js';

import {
  hosts,
  methods,
} from '../../data/data.js';

import s from './regForm.scss';

function RegForm() {

  const context = useContext(AppContext); 

  const [name, setName] = useState('');
  const [isNameValid, setIsNameValid] = useState(false);
  const [nameError, setNameError] = useState(validationErrors.nameErrors.noName);

  const [surname, setSurname] = useState('');
  const [isSurnameValid, setIsSurnameValid] = useState(false);
  const [surnameError, setSurnameError] = useState(validationErrors.surnameErrors.noSurname);

  const [email, setEmail] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [emailError, setEmailError] = useState(validationErrors.emailErrors.noEmail);

  const [password, setPassword] = useState('');
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [passwordError, setPasswordError] = useState(validationErrors.passwordErrors.noPassword);

  const [passwordCopy, setPasswordCopy] = useState('');
  const [isPasswordCopyValid, setIsPasswordCopyValid] = useState(false);
  const [passwordCopyError, setPasswordCopyError] = useState(validationErrors.passwordErrors.noPassword);

  const [isAllValid, setIsAllValid] = useState(false);

  const [focusedElement, setFocusedElement] = useState(0);

  const validationArray = [isNameValid, isSurnameValid, isEmailValid, isPasswordValid, isPasswordCopyValid];

  useEffect(() => {
    setIsAllValid(checkIfAllValid(validationArray));
  }, validationArray);

  function onKeyDownHandler(e) {
    if (e.code === 'Enter' || e.key === 'Enter') {
      e.preventDefault();
      setFocusedElement(state => (state + 1) % 6);
    }
  }

  function preventDefault(e) {
    e.preventDefault();
    //if(isAllValid) onSubmitHandler();
  }

  async function onSubmitHandler(e) {
    e.preventDefault();
    try {
      const response = await fetch('http://62.109.19.55:8080/api/registration', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          mode: 'no-cors',
          referrerPolicy: "unsafe-url",
        },
        body: JSON.stringify({
          "firstName": "Lester",
          "lastName": "Freemon",
          "password": "password1234",
          "role": "STUDENT",
          "email": "LesterFreemon@yandex.ru"
        })
      });
      const result = await response.text();
      console.log(result);
    }
    catch (err) {
      console.log(err);
    }

  }


  return (
    <div className={ s.background }>
      <div className={ s.container }>
      <p className={ s.auth }>Авторизация</p>
      <form onSubmit={ preventDefault }>
      <div>
        <InputText 
          id='regForm__name__id'
          placeholder='Введите имя' 
          setContent={ setName }
          isContentValid={ isNameValid }
          checkContent={ checkName.bind(null, setIsNameValid, setNameError) }
          contentError={ nameError }
          onKeyDownHandler={ onKeyDownHandler }
          autofocus={ true }
          focus={ focusedElement === 0 }
        />
      </div>

      <div>
        <InputText 
          id='regForm__surname__id'
          placeholder='Введите фамилию'
          setContent={ setSurname }
          isContentValid={ isSurnameValid }
          checkContent={ checkSurname.bind(null, setIsSurnameValid, setSurnameError) }
          contentError={ surnameError }
          onKeyDownHandler={ onKeyDownHandler }
          autofocus={ false }
          focus={ focusedElement === 1 }
        />
      </div>

      <div>
        <InputText 
          id='regForm__email__id'
          placeholder='Введите e-mail' 
          setContent={ setEmail }
          isContentValid={ isEmailValid }
          checkContent={ checkEmail.bind(null, setIsEmailValid, setEmailError) }
          contentError={ emailError }
          onKeyDownHandler={ onKeyDownHandler }
          autofocus={ false }
          focus={ focusedElement === 2 }
        />
      </div>

      <div>
        <InputText 
          id='regForm__password__id'
          type='password'
          placeholder='Придумайте пароль'
          setContent={ setPassword }
          isContentValid={ isPasswordValid }
          checkContent={ checkPassword.bind(null, setIsPasswordValid, setPasswordError) }
          contentError={ passwordError }
          onKeyDownHandler={ onKeyDownHandler }
          autofocus={ false }
          focus={ focusedElement === 4 }
        />
      </div>

      <div className={ s.gap }>
        <InputText 
          id='regForm__passwordCopy__id'
          type='password'
          placeholder='Повторите пароль'
          setContent={ setPasswordCopy }
          isContentValid={ isPasswordCopyValid }
          checkContent={ checkPasswordCopy.bind(null, setIsPasswordCopyValid, setPasswordCopyError, password) }
          contentError={ passwordCopyError }
          onKeyDownHandler={ onKeyDownHandler }
          autofocus={ false }
          focus={ focusedElement === 5 }
        />
      </div>

      <div className={ s.buttonWrapper }>
        <button 
          //className={ isAllValid ? s.button : s.buttonInactiv }
          className={ s.button }
          onClick={ onSubmitHandler }
        >Зарегистрироваться</button>
      </div>
      </form>
      </div>
    </div>
  );
}

export default RegForm;