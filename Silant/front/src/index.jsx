import React from 'react';
import ReactDOM from 'react-dom'; // Обновлен импорт
import './index.css';
import App from './App';
import store from './Store/Store'; // Обновлен импорт
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

ReactDOM.render(
    <Provider store={store}> {/* Исправлено название переменной store */}
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);
