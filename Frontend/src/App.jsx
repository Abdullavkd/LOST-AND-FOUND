
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './Components/Navbar'

function App() {

  return (
    <BrowserRouter>
    <div className='p-3'>
      <Navbar />
      <Routes>
        {/* <Route path='/' element ={<Home/>}/> */}
      </Routes>
    </div>
    </BrowserRouter>
  )
}

export default App
