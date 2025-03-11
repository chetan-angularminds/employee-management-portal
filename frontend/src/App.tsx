import { useEffect } from 'react';
import './App.css'
import Navbar from './components/navbar/navbar';
import themeService from './core/services/theme.service';
import Router from './router';

function App() {
useEffect(()=>{
  themeService.checkTheme()
})

  return (
    <>
      <Navbar/>
      <main className='pt-6 w-[100%]'>
        <Router/>
      </main>
    </>
  )
}

export default App
