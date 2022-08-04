import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import App from './components/App/App.jsx';
import Base from './components/Base/Base.jsx';
import Start from './components/Start/Start.jsx';

const root = createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={ <Navigate to='/app/start' replace={ true } /> } />
      <Route path='/app' element={ <App /> } >
        <Route path='start' element={ <Start /> } />
        <Route path='base' element={ <Base /> } />
      </Route>
    </Routes>
  </BrowserRouter>
)