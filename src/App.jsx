import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Prodected from './pages/Prodected'
import Feed from './pages/Feed'


const App = () => {
  return <BrowserRouter>
    <Routes >
      <Route path='/' element={<Login />} />

      <Route element={<Prodected />}>
        <Route path='/home' element={<Feed />} />

      </Route>
    </Routes>
  </BrowserRouter>
}

export default App