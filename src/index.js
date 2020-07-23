import React from 'react';
import { render } from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import { BrowserRouter } from 'react-router-dom'
import App from './components/routing/Routes';

render(

    (<BrowserRouter>
        <App />
    </BrowserRouter>
    ), document.getElementById('root')
    
);

