import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from "react-router-dom";
import { store } from './configure-store';
import { Provider } from 'react-redux';
import locals from './locals';
import { App } from './App';
import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next'

  const i18n = i18next.createInstance()

  await i18n
    .use(initReactI18next)
    .init({
      resources: locals,
      fallbackLng: 'ru',
    })

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <I18nextProvider i18n={i18n}>
          <App />
        </I18nextProvider>
      </Provider>
    </BrowserRouter>
  </StrictMode>,
)
