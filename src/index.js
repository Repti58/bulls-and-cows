import App from './App';
import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import Main from './Components/Main';


const root = ReactDOM.createRoot(document.getElementById('root'));
    debugger
root.render(  
    <BrowserRouter>
        <App />
    </BrowserRouter>
    
);

