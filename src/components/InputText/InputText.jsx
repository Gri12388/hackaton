import React, { useContext, useEffect, useMemo, useState } from 'react';

import c from '../../assets/styles/common.scss';
import s from './inputText.scss';

function InputText({ 
  label, 
  name, 
  id, 
  placeholder, 
  type, 
  contentError, 
  setContent, 
  checkContent, 
  isContentValid, 
  autofocus, 
  onKeyDownHandler, 
  focus, 
}) {

  const inputType = useMemo(() => {
    if (['email', 'password', 'date'].includes(type)) return type;
    else return 'text';
  }, []);

  const [isFocused, setIsFocused] = useState(false); 
  const [isVisited, setIsVisited] = useState(false);
  const [isError, setIsError] = useState(false);
  const [inputElement, setInputElement] = useState();

  useEffect(() => {
    setInputElement(document.getElementById(id));
  }, []);

  useEffect(() => {
    if (inputElement && focus) inputElement.focus();
  }, [focus]);

  
  function onChangeHandler(e) {
    setContent(e.currentTarget.value);
    checkContent(e.currentTarget.value);
  }
  
  function onFocusHandler() {
    setIsFocused(true);
  }

  function onBlurHandler() {
    setIsFocused(false);
    setIsVisited(true);
    
    if (isContentValid) setIsError(false);
    else setIsError(true);
  }

  function getInputWrapperClassName() {
    if (isFocused) return s.inputWrapperFocused;
    if (isError) return s.inputWrapperBad;
    if (isVisited && !isError) return s.inputWrapperGood;
    else return s.inputWrapper;
  }


  return (
    <>
      <div className={ s.labelWrapper }>
        <label className={ s.label } htmlFor={ id }>{ label }</label>
      </div>
      
      <div className={ getInputWrapperClassName() }>
        <input 
          type={ inputType } 
          name={ name } 
          id={ id } 
          placeholder={ placeholder } 
          className={ s.input } 
          onChange={ onChangeHandler }
          onFocus={ onFocusHandler }
          onBlur={ onBlurHandler }
          onKeyDown={ onKeyDownHandler }
          autoFocus={ autofocus }
        />
      </div>
      
      <div className={ s.errorWrapper } style={{ visibility: isError ? 'visible' : 'hidden' }}>
        <p className={ s.error }>{ isVisited && !isFocused && isError && contentError }</p>
      </div>
    </>
  );
}

export default InputText;