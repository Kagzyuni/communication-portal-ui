import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Login from './pages/Login';
import Register from './pages/Register';
import DashboardApp from './pages/DashboardApp';
import Products from './pages/Products';
import Blog from './pages/Blog';
import User from './pages/User';
import NotFound from './pages/Page404';

// ----------------------------------------------------------------------

export default function Router() {

  const [users, setUsers] = useState({});

  useEffect(()=>{
    getData();
  },[]);

  const getData = () => {
    Axios.get('http://localhost:8082/users')
    .then(response =>{
      if(response.status === 200){
        console.log("API dATA",JSON.stringify(response.data))
          const j = response.data;
          setUsers(j);
       // navigate('/login', { replace: true });
      } 
    });
  }


  return useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" replace /> },
        { path: 'app', element: <DashboardApp /> },
        { path: 'user', element: <User userList={users}/> },
        { path: 'products', element: <Products /> },
        { path: 'blog', element: <Blog /> }
      ]
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: '404', element: <NotFound /> },
        { path: '/', element: <Navigate to="/login" /> },
        { path: '*', element: <Navigate to="/404" /> }
      ]
    },
    { path: '*', element: <Navigate to="/404" replace /> }
  ]);
}
