import React, { useEffect, useMemo, useState } from 'react';

import sprite from '../../assets/images/sprite.svg';

import s from'./dropDown.scss';

function DropDown({ 
  label, 
  name, 
  id, 
  placeholder, 
  options, 
  content,
  setContent,
  isContentValid,
  contentError,
  checkContent,
  onKeyDownHandler,
  autofocus,
  focus
}) {
  
  const optionItems = useMemo(() => {
    const temp = options.map((item, index) => {
      return <option key={ index } value={ item }>{ item }</option>
    });
    temp.push(<option key={ options.length } value='' disabled hidden>{ placeholder }</option>);
    return temp;
  }, [options]);

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

  function getSelectWrapperClassName() {
    if (isFocused) return s.selectWrapperFocused;
    if (isError) return s.selectWrapperBad;
    if (isVisited && !isError) return s.selectWrapperGood;
    else return s.selectWrapper;
  }

  return (
    <>
    <div className={ s.labelWrapper }>
        <label className={ s.label } htmlFor={ id }>{ label }</label>
      </div>

      <div className={ getSelectWrapperClassName() }>
        <select 
          className={ content === '' ? `${s.select} ${s.placeholder}` : s.select }
          value={ content }
          id={ id } 
          name={ name }
          onChange={ onChangeHandler }
          onFocus={ onFocusHandler }
          onBlur={ onBlurHandler }
          onKeyDown={ onKeyDownHandler }
          autoFocus={ autofocus }
        > { optionItems }</select>
      </div>

      <div className={ s.errorWrapper } style={{ visibility: isError ? 'visible' : 'hidden' }}>
        <p className={ s.error }>{ isVisited && !isFocused && isError && contentError }</p>
      </div>
    </>
  );
}

export default DropDown;