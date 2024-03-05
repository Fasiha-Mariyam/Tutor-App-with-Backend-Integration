import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store, persistor } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { SnackbarProvider } from 'notistack';
import { Provider as JotaiProvider } from 'jotai';
import App from './App.jsx';
import 'react-quill/dist/quill.snow.css';
import 'react-datepicker/dist/react-datepicker.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <JotaiProvider>
      <PersistGate loading={null} persistor={persistor}></PersistGate>
      <SnackbarProvider>
        <App />
      </SnackbarProvider>
    </JotaiProvider>
  </Provider>
);
