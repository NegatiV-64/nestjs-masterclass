import "@fontsource/inter/100.css";
import "@fontsource/inter/200.css";
import "@fontsource/inter/300.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import '~/styles/global.css'
import React from 'react'
import { CookiesProvider } from 'react-cookie'
import ReactDOM from 'react-dom/client'
import { AuthProvider } from '~/providers/auth.provider'
import { RouterProvider } from 'react-router-dom'
import { router } from '~/routes'
import { ToastProvider } from '~/providers/toast.provider'
import { HelmetProvider } from "react-helmet-async";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <CookiesProvider>
      <HelmetProvider>
        <AuthProvider>
          <ToastProvider>
            <RouterProvider router={router} />
          </ToastProvider>
        </AuthProvider>
      </HelmetProvider>
    </CookiesProvider>
  </React.StrictMode>,
)
