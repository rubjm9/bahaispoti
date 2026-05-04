import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from "react-redux";
import { store } from "./store";
import App from './App';
import * as serviceWorkerRegistration from './utils/registerServiceWorker';

import './style/index.css';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// Registrar service worker en producción
if (process.env.NODE_ENV === 'production') {
  serviceWorkerRegistration.register({
    onUpdate: (registration) => {
      // Notificar al usuario sobre actualizaciones disponibles
      if (window.confirm('Hay una nueva versión disponible. ¿Deseas actualizar?')) {
        registration.waiting?.postMessage({ type: 'SKIP_WAITING' });
        window.location.reload();
      }
    },
    onSuccess: (registration) => {
      console.log('Service Worker registrado exitosamente');
    }
  });
}