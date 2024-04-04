import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import SystemContainer from './components/SystemContainer';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <SystemContainer>
      <App />
    </SystemContainer>
  </React.StrictMode>,
);
