import React, { useContext, useEffect, useState } from 'react';

import { AppContext } from '../App/App.jsx';
import InputText from '../InputText/InputText.jsx';
import DropDown from '../DropDown/DropDown.jsx';

import {
  checkEmail,
  checkIfAllValid,
  checkName,
  checkPassword,
  checkPasswordCopy,
  checkRole,
  checkSurname,
  languages,
  roles,
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
  const [nameError, setNameError] = useState(validationErrors.nameErrors.noName[context.language]);

  const [surname, setSurname] = useState('');
  const [isSurnameValid, setIsSurnameValid] = useState(false);
  const [surnameError, setSurnameError] = useState(validationErrors.surnameErrors.noSurname[context.language]);

  const [email, setEmail] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [emailError, setEmailError] = useState(validationErrors.emailErrors.noEmail[context.language]);

  const [role, setRole] = useState('');
  const [isRoleValid, setIsRoleValid] = useState(false);
  const [roleError, setRoleError] = useState(validationErrors.roleError.noRole[context.language]);

  const [password, setPassword] = useState('');
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [passwordError, setPasswordError] = useState(validationErrors.passwordErrors.noPassword[context.language]);

  const [passwordCopy, setPasswordCopy] = useState('');
  const [isPasswordCopyValid, setIsPasswordCopyValid] = useState(false);
  const [passwordCopyError, setPasswordCopyError] = useState(validationErrors.passwordErrors.noPassword[context.language]);

  const [isAllValid, setIsAllValid] = useState(false);

  const [focusedElement, setFocusedElement] = useState(0);

  const validationArray = [isNameValid, isSurnameValid, isEmailValid, isRoleValid, isPasswordValid, isPasswordCopyValid];

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

  function onSubmitHandler(e) {
    if (isAllValid) {
      console.log('hello, I am RegForm');
      sendReg();
    }
  }

  function createBody() {
    const body = {
      firstName: name,
      lastName: surname,
      password: password,
      role: role,
      email: email,
    }
    return JSON.stringify(body);
  }

  async function sendReg() {
    try {
      const response = await fetch(new URL('api/registration', hosts.host6210919553000), {
        method: methods.post,
        headers: {
          'Content-Type': 'application/json',
          mode: 'no-cors',
          referrerPolicy: "unsafe-url",
        },
        body: createBody(),
      });
      const result = await response.json();
      console.log(result);
    }
    catch (err) {
      console.error('Test is failed:', err);
    }
  }



  return (
    <form className={ s.container } onSubmit={ preventDefault }>
      <div>
        <InputText 
          id='regForm__name__id'
          label={ languages.name[context.language] } 
          placeholder={ languages.typeName[context.language] } 
          setContent={ setName }
          isContentValid={ isNameValid }
          checkContent={ checkName.bind(null, setIsNameValid, setNameError, context.language) }
          contentError={ nameError }
          onKeyDownHandler={ onKeyDownHandler }
          autofocus={ true }
          focus={ focusedElement === 0 }
        />
      </div>

      <div>
        <InputText 
          id='regForm__surname__id'
          label={ languages.surname[context.language] }
          placeholder={ languages.typeSurname[context.language] }
          setContent={ setSurname }
          isContentValid={ isSurnameValid }
          checkContent={ checkSurname.bind(null, setIsSurnameValid, setSurnameError, context.language) }
          contentError={ surnameError }
          onKeyDownHandler={ onKeyDownHandler }
          autofocus={ false }
          focus={ focusedElement === 1 }
        />
      </div>

      <div>
        <InputText 
          id='regForm__email__id'
          label={ languages.email[context.language] } 
          placeholder={ languages.typeEmail[context.language] } 
          setContent={ setEmail }
          isContentValid={ isEmailValid }
          checkContent={ checkEmail.bind(null, setIsEmailValid, setEmailError, context.language) }
          contentError={ emailError }
          onKeyDownHandler={ onKeyDownHandler }
          autofocus={ false }
          focus={ focusedElement === 2 }
        />
      </div>
      
      <div>
        <DropDown 
          id='regForm__role__id'
          label={ languages.role[context.language] }
          name='role'
          placeholder={ languages.chooseRole[context.language] }
          options={[roles.teacher, roles.student]}
          content={ role }
          setContent={ setRole }
          isContentValid={ isRoleValid }
          contentError={ roleError }
          checkContent={ checkRole.bind(null, setIsRoleValid, setRoleError, context.language) }
          onKeyDownHandler={ onKeyDownHandler }
          autofocus={ false }
          focus={ focusedElement === 3 }
        />
      </div>

      <div>
        <InputText 
          id='regForm__password__id'
          type='password'
          label={ languages.password[context.language] } 
          placeholder={ languages.typePassword[context.language] }
          setContent={ setPassword }
          isContentValid={ isPasswordValid }
          checkContent={ checkPassword.bind(null, setIsPasswordValid, setPasswordError, context.language) }
          contentError={ passwordError }
          onKeyDownHandler={ onKeyDownHandler }
          autofocus={ false }
          focus={ focusedElement === 4 }
        />
      </div>

      <div>
        <InputText 
          id='regForm__passwordCopy__id'
          type='password'
          label={ languages.passwordCopy[context.language] } 
          placeholder={ languages.repeatPassword[context.language] } 
          setContent={ setPasswordCopy }
          isContentValid={ isPasswordCopyValid }
          checkContent={ checkPasswordCopy.bind(null, setIsPasswordCopyValid, setPasswordCopyError, password, context.language) }
          contentError={ passwordCopyError }
          onKeyDownHandler={ onKeyDownHandler }
          autofocus={ false }
          focus={ focusedElement === 5 }
        />
      </div>

      <div className={ s.buttonWrapper }>
        <button 
          className={ isAllValid ? s.button : s.buttonInactiv }
          onClick={ onSubmitHandler }
        >{ languages.register[context.language] }</button>
      </div>
    </form>
  );
}

export default RegForm;