import React from 'react';
import ReactDOM from 'react-dom/client';

import { App } from './components';

const root = (
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

ReactDOM.createRoot(document.getElementById('root')).render(root);