import './App.css'
import NavbarDemo from './components/navbar/navbar';
import Router from './router';

function App() {


  return (
    <>
      <NavbarDemo/>
      <main className='pt-6 w-[100%]'>
        <Router/>
      </main>
    </>
  )
}

export default App
