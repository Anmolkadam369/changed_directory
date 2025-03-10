import React from 'react';
import ReactDOM from 'react-dom/client';
import { RecoilRoot } from 'recoil';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../src/Component/Firebase/Firebase';
import {HelmetProvider} from "react-helmet-async";
import { WebSocketProvider } from './Component/ContexAPIS/WebSocketContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HelmetProvider>
    <RecoilRoot>
    <WebSocketProvider>
    <App />
    </WebSocketProvider>
    </RecoilRoot>
    </HelmetProvider>
  </React.StrictMode>
);