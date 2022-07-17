import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './components/app';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';

let root = createRoot(document.getElementById('root')!)
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <App /> }/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
