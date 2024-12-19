import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './Home.jsx'
import Auth from './auth/Auth.jsx'
import Dashboard from './Dashboard/Dashboard.jsx'
import TickerPage from './Dashboard/ticker/[ticker]/TickerPage.jsx'
import { ClerkProvider } from '@clerk/clerk-react'


const publishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: '/dashboard',
        element: <Dashboard />
      },
      {
        path: '/dashboard/ticker/:ticker',
        element: <TickerPage />
      }
    ]
  },
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/auth',
    element: <Auth />
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ClerkProvider publishableKey={publishableKey} afterSignOutUrl={'/'}>
      <RouterProvider router={router} />
    </ClerkProvider>
  </StrictMode>,
)
