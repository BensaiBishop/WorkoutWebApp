import { useState } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { Outlet } from 'react-router-dom'

import './App.css'


const App = () => {
  console.log('App component rendered');

  return (
    <div className='App flex flex-col min-h-screen'>
      <div className='flex-grow'>
      
      <Navbar />
      <div className='h-1 bg-zinc-500'></div>
      <Outlet />

      </div>
      <Footer/>
    </div>
   
  )
}

export default App
