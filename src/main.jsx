import React from 'react';
import ReactDOM from 'react-dom';
import AppWrapper from './AppWrapper'; // Adjust the import path as necessary
import * as serviceWorker from './serviceWorker';
ReactDOM.render(
 <React.StrictMode>
    <AppWrapper />
 </React.StrictMode>,
 document.getElementById('root')
);

