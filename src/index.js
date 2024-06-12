import React from 'react';
import ReactDOM from 'react-dom/client';
import { RecoilRoot } from 'recoil';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../src/Component/Firebase/Firebase'
import {HelmetProvider} from "react-helmet-async"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HelmetProvider>
    <RecoilRoot>
    <App />
    </RecoilRoot>
    </HelmetProvider>
  </React.StrictMode>
);