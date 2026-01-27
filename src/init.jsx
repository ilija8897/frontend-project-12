import i18next from 'i18next'
import { I18nextProvider, initReactI18next } from 'react-i18next'
import { Provider } from 'react-redux'
import { StrictMode } from 'react'
import { BrowserRouter } from 'react-router-dom'

import { App } from './App'
import locals from './locals'
import { store } from './configure-store'

export const init = async () => {
  const i18n = i18next.createInstance()

  await i18n
    .use(initReactI18next)
    .init({
      resources: locals,
      fallbackLng: 'ru',
    })
  return (
    <StrictMode>
      <BrowserRouter>
        <Provider store={store}>
          <I18nextProvider i18n={i18n}>
            <App />
          </I18nextProvider>
        </Provider>
      </BrowserRouter>
    </StrictMode>
  )
}
