import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import "react-router-dom"
import './App.css'
import Voter from './Components/Voter'
import Admin from './Components/Admin'
import Home from './Components/Home'
import { BrowserRouter, Routes, Route} from 'react-router-dom'

function App() {


  return (
    <>
      
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/Admin" element={<Admin/>} />
          <Route path="/Voter" element={<Voter/>} />

        </Routes>
      
      </BrowserRouter>
    </>
  )
}

export default App
