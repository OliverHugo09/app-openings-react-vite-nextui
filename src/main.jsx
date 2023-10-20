import React from 'react'
import ReactDOM from 'react-dom/client'
import { NextUIProvider } from '@nextui-org/react'
import './index.css'
import { OpeningsApp } from './OpeningsApp'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthProvider'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <React.StrictMode>
      <NextUIProvider>
        <AuthProvider>
          <Routes>
            <Route path='/*' element={<OpeningsApp />} />
          </Routes>
        </AuthProvider>
      </NextUIProvider>
    </React.StrictMode>
  </BrowserRouter>

)
