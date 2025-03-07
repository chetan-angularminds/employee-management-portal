import './App.css'
import Navbar from './components/navbar/navbar';
import Router from './router';

function App() {


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
