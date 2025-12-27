import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Home from './components/Home/Home.jsx'
import Header from './components/Header/Header.jsx'
import Login from './components/Login/Login.jsx'
import Footer from './components/Footer/Footer.jsx'
import Register from './components/Register/Register.jsx'
import About from './components/About/About.jsx'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Layout.jsx'
import UserContextProvider from "./context/UserContextProvider";
import ProtectedRoute from './Routes/ProtectRoute.jsx';
import HomeRoute from './Routes/HomeRoute.jsx';
import DashboardHome from './components/DashboardHome/DashboardHome.jsx';
import AdminRoute from './Routes/AdminRoute.jsx';
import AdminPost from './components/AdminPost/AdminPost.jsx';
import Contact from './components/Contact/Contact.jsx';
import ViewProduct from './components/ViewProduct/ViewProduct.jsx';
import AdminDashboard from './components/AdminDashboard.jsx';
import AIAgent from "./components/AIAgent/AIAgent";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomeRoute />
      }
      ,
      {
        path: "DashboardHome",
        element: (
          <ProtectedRoute>
            <DashboardHome />
          </ProtectedRoute>
        )
      },
      {
        path: "admin/dashboard",
        element: (
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        ),
      },
      {
        path: "about",
        element: <About />
      },
      {
        path: "contact",
        element: <Contact />
      },
      {
        path: "viewproduct/:id",
        element: <ViewProduct />
      },
      {
        path: "login",
        element: <Login />
      },
      {
        path: "register",
        element: <Register />
      },
      {
        path: "/ai-agent",
        element: <AIAgent />
      },
      {
        path: "admin/posts",
        element: (
          <AdminRoute>
            <AdminPost />
          </AdminRoute>
        ),
      }
    ]
  }])


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserContextProvider>    {/* 👈 WRAP HERE */}
      <RouterProvider router={router} />
    </UserContextProvider>
  </StrictMode>
)
