import React from 'react'
import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Header from './components/Header'

import Home from './pages/Home'
import Quiz from './pages/Quiz'
import Result from './pages/Result'
function App() {
 
  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/quiz' element={<Quiz/>}></Route>
        <Route path='/result' element={<Result/>}></Route>
      </Routes>
 
    </BrowserRouter>
  )
}

export default App
