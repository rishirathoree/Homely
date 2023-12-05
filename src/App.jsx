import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ParentRoutes from './App/WebApp/ParentRoutes'
import Layout from './App/Layout'
import 'boxicons/css/boxicons.min.css'

const App = () => {
  return (
    <>
    <BrowserRouter>
    <Layout />
    </BrowserRouter>
    </>
  )
}


export default App