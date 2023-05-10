import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import App from './App';
import AppLayout from './components/AppLayout/AppLayout';
import { BrowserRouter } from 'react-router-dom';

//ReactDOM.render(<App />, document.getElementById('root'));

ReactDOM.render(<BrowserRouter><AppLayout /></BrowserRouter>, document.getElementById('root'));
