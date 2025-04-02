import React from 'react';
import ReactDOM from 'react-dom/client';
import { RecoilRoot } from 'recoil';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../src/Services/Firebase/Firebase'
import { HelmetProvider } from "react-helmet-async";
import { WebSocketProvider } from '../src/ContexAPI/WebSocketContext.jsx';

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