'use client';

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { Amplify } from '@aws-amplify';
import outputs from '@/amplify_outputs.json';

Amplify.configure(outputs);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    React.createElement(React.StrictMode, null, React.createElement(App))
);
