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

  const [role, setRole] = useState('STUDENT');

  const [isAllValid, setIsAllValid] = useState(false);

  const [focusedElement, setFocusedElement] = useState(0);

  const validationArray = [isNameValid, isSurnameValid, isEmailValid, isPasswordValid, isPasswordCopyValid];

  const [messageError, setMessageError] = useState('');

  useEffect(() => {
    setIsAllValid(checkIfAllValid(validationArray));
  }, validationArray);

  function preventDefault(e) {
    e.preventDefault();
    //if(isAllValid) onSubmitHandler();
  }

  function createBody() {
    let json = JSON.stringify({
      firstName: name,
      lastName: surname,
      password: password,
      role: role,
      email: email,
      city: city,
      hobby: hobby,
      age: Date.parse(age),
    });
    console.log(json);
    return json;
  }

  

  function onRadioClick(e) {
    setRole(e.target.value);
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
            <InputText 
              id='regForm__name__id'
              placeholder='Введите имя' 
              setContent={ setName }
              isContentValid={ isNameValid }
              checkContent={ checkName.bind(null, setIsNameValid, setNameError) }
              contentError={ nameError }
              autofocus={ true }
            />
        </div>
        
        <div className={ s.right }>
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
      </div>

      <div className={ s.subcontainer }>
        <div className={ s.left }>
          <InputText 
            id='regForm__email__id'
            placeholder='Введите e-mail' 
            setContent={ setEmail }
            isContentValid={ isEmailValid }
            checkContent={ checkEmail.bind(null, setIsEmailValid, setEmailError) }
            contentError={ emailError }
            autofocus={ false }
          />
        </div>
        
        <div className={ s.right }>
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
      </div>

      <div className={ s.subcontainer }>
        <div className={ s.left }>
          <InputText 
            id='regForm__age__id'
            type='date'
            placeholder='Укажите дату рождения' 
            setContent={ setAge }
            isContentValid={ isAgeValid }
            checkContent={ checkAge.bind(null, setIsAgeValid, setAgeError) }
            contentError={ ageError }
            autofocus={ false }
          />
        </div>
        
        <div className={ s.right }>
          <DropDown 
            id='regForm__hobby__id'
            placeholder='Укажите Ваши интересы' 
            content={ hobby }
            options={ ['Frontend', 'Backend'] }
            setContent={ setHobby }
            isContentValid={ isHobbyValid }
            checkContent={ checkHobby.bind(null, setIsHobbyValid, setHobbyError) }
            contentError={ hobbyError }
            autofocus={ false }
          />
        </div>
      </div>

      <div className={ s.subcontainer }>
        <div className={ s.left }>
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
        
        <div className={ s.right }>
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


































        
        <div className={ s.radio }>
          <div>
            <input 
              onChange={ onRadioClick }
              type='radio' 
              id='RegForm__student__id' 
              name='RegForm__radio__name' 
              value='STUDENT' 
              checked={ role === 'STUDENT'} 
            />
            <label className={ s.label } htmlFor='RegForm__student__id'>Студент</label>
          </div>
          
          <div>
            <input 
              className={ s.radioGap }
              onChange={ onRadioClick }
              type='radio' 
              id='RegForm__ticher__id' 
              name='RegForm__radio__name' 
              value={ 'TICHER' }  
              checked={ role === 'TICHER' }
            />
            <label className={ s.label } htmlFor='RegForm__student__id'>Преподаватель</label>
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