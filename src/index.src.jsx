import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import App from './components/App/App.jsx';
import LoginForm from './components/LoginForm/LoginForm.jsx';
import RegForm from './components/RegForm/RegForm.jsx';
import Courses from './components/Courses/Courses.jsx';
import Course from './components/Course/Course.jsx';
import Learn from './components/Learn/Learn.jsx';


const root = createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={ <App /> }>
        <Route path='auth' element={ <LoginForm /> } />
        <Route path='reg' element={ <RegForm /> } />
        <Route path='courses' element={ <Courses /> } />
        <Route path='course' element={ <Course /> } />
        <Route path='learn' element={ <Learn /> } />
      </Route>
    </Routes>
  </BrowserRouter>
)