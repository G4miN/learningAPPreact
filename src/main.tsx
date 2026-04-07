import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { PrimeReactProvider } from 'primereact/api'
import { definePreset } from '@primeuix/themes'
import Aura from '@primeuix/themes/aura'
import 'primeicons/primeicons.css'
import './index.css'
import App from './App.tsx'

const AppTheme = definePreset(Aura, {
  semantic: {
    primary: {
      50:  '#f5f3ff',
      100: '#ede9fe',
      200: '#ddd6fe',
      300: '#c4b5fd',
      400: '#a78bfa',
      500: '#8b5cf6',
      600: '#7c3aed',
      700: '#6d28d9',
      800: '#5b21b6',
      900: '#4c1d95',
      950: '#2e1065',
    },
  },
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PrimeReactProvider
      value={{
        theme: {
          preset: AppTheme,
          options: {
            darkModeSelector: '[data-theme="dark"]',
            cssLayer: false,
          },
        },
      }}
    >
      <App />
    </PrimeReactProvider>
  </StrictMode>,
)
