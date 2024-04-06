import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import SystemContainer from './components/SystemContainer';
import { Provider } from 'react-redux';
import { store } from './components/store/store';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <SystemContainer>
        <App />
      </SystemContainer>
    </Provider>
  </React.StrictMode>,
);
