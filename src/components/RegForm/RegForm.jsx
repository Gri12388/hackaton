import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { AppContext } from '../App/App.jsx';
import InputText from '../InputText/InputText.jsx';
import DropDown from '../DropDown/DropDown.jsx';

import {
  checkAge,
  checkCity,
  checkHobby,
  checkEmail,
  checkIfAllValid,
  checkName,
  checkPassword,
  checkPasswordCopy,
  checkSurname,
  validationErrors,
} from '../../data/data.js';


import s from './regForm.scss';

function RegForm() {

  const context = useContext(AppContext); 
  const navigate = useNavigate();

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

  const [city, setCity] = useState('');
  const [isCityValid, setIsCityValid] = useState(false);
  const [cityError, setCityError] = useState(validationErrors.cityErrors.noCity);

  const [hobby, setHobby] = useState('');
  const [isHobbyValid, setIsHobbyValid] = useState(false);
  const [hobbyError, setHobbyError] = useState(validationErrors.hobbyErrors.noHobby);

  const [age, setAge] = useState('');
  const [isAgeValid, setIsAgeValid] = useState(false);
  const [ageError, setAgeError] = useState(validationErrors.ageErrors.noAge);

  const [isAllValid, setIsAllValid] = useState(false);

  const [focusedElement, setFocusedElement] = useState(0);

  const validationArray = [isNameValid, isSurnameValid, isEmailValid, isPasswordValid, isPasswordCopyValid];

  const [messageError, setMessageError] = useState('');

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

  function createBody() {
    return JSON.stringify({
      firstName: name,
      lastName: surname,
      password: password,
      role: 'student',
      email: email,
    });
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
        body: createBody()
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


  return (
    <div className={ s.background }>
      <div className={ s.container }>
      <p className={ s.auth }>Регистрация</p>
      <p className={ s.messageError }>{ messageError }</p>
      <form onSubmit={ preventDefault }>
        
        <div className={ s.subcontainer }>
          <div className={ s.left }>
          
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
            />
          </div>
          <div>
            <InputText 
              id='regForm__age__id'
              placeholder='Укажите возраст' 
              setContent={ setAge }
              isContentValid={ isAgeValid }
              checkContent={ checkAge.bind(null, setIsAgeValid, setAgeError) }
              contentError={ ageError }
              autofocus={ false }
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
              autofocus={ false }
            />
          </div>

          </div>


          <div className={ s.right }>
          
          <div>
            <InputText 
              id='regForm__surname__id'
              placeholder='Введите фамилию'
              setContent={ setSurname }
              isContentValid={ isSurnameValid }
              checkContent={ checkSurname.bind(null, setIsSurnameValid, setSurnameError) }
              contentError={ surnameError }
              autofocus={ false }
            />
          </div>
          <div>
            <InputText 
              id='regForm__city__id'
              placeholder='Укажите город' 
              setContent={ setCity }
              isContentValid={ isCityValid }
              checkContent={ checkCity.bind(null, setIsCityValid, setCityError) }
              contentError={ cityError }
              autofocus={ false }
            />
          </div>
          <div>
            <InputText 
              id='regForm__hobby__id'
              placeholder='Укажите интересы(frongend, backend...)' 
              setContent={ setHobby }
              isContentValid={ isHobbyValid }
              checkContent={ checkHobby.bind(null, setIsHobbyValid, setHobbyError) }
              contentError={ hobbyError }
              autofocus={ false }
            />
          </div>
          <div>
            <InputText 
              id='regForm__passwordCopy__id'
              type='password'
              placeholder='Повторите пароль'
              setContent={ setPasswordCopy }
              isContentValid={ isPasswordCopyValid }
              checkContent={ checkPasswordCopy.bind(null, setIsPasswordCopyValid, setPasswordCopyError, password) }
              contentError={ passwordCopyError }
              autofocus={ false }
            />
          </div>

          </div>
        </div>
        

        <div className={ s.buttonWrapper }>
          <button 
            className={ isAllValid ? s.button : s.buttonInactiv }
            //className={ s.button }
            onClick={ onSubmitHandler }
          >Зарегистрироваться</button>
        </div>
      </form>
      </div>
    </div>
  );
}

export default RegForm;