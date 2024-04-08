import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // React Router
import { SoundStream } from './SoundStream';

// import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap CSS

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <SoundStream />
    </BrowserRouter>
  </React.StrictMode>
);