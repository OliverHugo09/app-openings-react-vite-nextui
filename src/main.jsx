import React from 'react'
import ReactDOM from 'react-dom/client'
import { NextUIProvider } from '@nextui-org/react'
import './index.css'
import { OpeningsApp } from './OpeningsApp'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <React.StrictMode>
      <NextUIProvider>
        <OpeningsApp />
      </NextUIProvider>
    </React.StrictMode>
  </BrowserRouter>

)
