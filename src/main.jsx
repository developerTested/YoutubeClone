import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import routeList from './routes'
import './index.css'
import AppContextProvider from './contexts/contextApi'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppContextProvider>
      <RouterProvider router={routeList} />
    </AppContextProvider>
  </React.StrictMode>,
)
