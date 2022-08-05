import React, { useContext, useState } from 'react';

import LoginForm from '../LoginForm/LoginForm.jsx';
import RegForm from '../RegForm/RegForm.jsx';
import { AppContext } from '../App/App.jsx';

import {
  hosts,
  methods,
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

  async function sendSimpleGet() {
    try {
      const response = await fetch(new URL('test1', hosts.host6210919553000), {
        method: methods.get,
        headers: {
          'Content-Type': 'application/json',
          mode: 'no-cors',
          referrerPolicy: "unsafe-url",
        }
      });
      const result = await response.json();
      console.log(result);
    }
    catch (err) {
      console.error('Test is failed:', err);
    }
  }

  async function sendComplexGet() {
    let urlTest = new URL('test2', hosts.host6210919553000);
    urlTest.searchParams.append('message', 'GET METHOD IS PASSED',);
    try {
      const response = await fetch(urlTest, {
        method: methods.get,
        headers: {
          'Content-Type': 'application/json',
          mode: 'no-cors',
          referrerPolicy: "unsafe-url",
        }
      });
      const result = await response.text();
      console.log(result);
    }
    catch (err) {
      console.error('Test is failed:', err);
    }
  }

  async function sendPost() {
    let urlTest = new URL('test3', hosts.host6210919553000);
    try {
      const response = await fetch(urlTest, {
        method: methods.post,
        headers: {
          'Content-Type': 'application/json',
          mode: 'no-cors',
          referrerPolicy: "unsafe-url",
        },
        body: {
          message: 'POST METHOD IS PASSED',
        }
      });
      const result = await response.text()();
      console.log(result);
    }
    catch(err) {
      console.error('Test is failed:', err);
    }
    
  }



  return (
    <div className={ c.container }>
      <main className={ s.main }>
        <div className={ s.left }>
          <button className={ s.button } onClick={ sendSimpleGet }>Check Simple GET</button>
          <button className={ s.button } onClick={ sendComplexGet } >Check Complex GET</button>
          <button className={ s.button } onClick={ sendPost }>Check PUT</button>
        </div>
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