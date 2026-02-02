
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './Components/Navbar'
import ItemCard from './Components/ItemCard'
import Home from './pages/Home'
import DataProvider from './Provider/DataProvider'
import PostItem from './pages/PostItem'
import PostDetails from './pages/PostDetails'

function App() {

  return (
    <BrowserRouter>
    <DataProvider>
      <div className='max-w-301 m-auto flex flex-col gap-3'>
        <Navbar />
        <Routes>
          <Route path='/' element ={<Home/>}/>
          <Route path='/postitem' element={<PostItem/>}/>
          <Route path='/postdetails' element={<PostDetails/>}/>
        </Routes>
      </div>
    </DataProvider>
    </BrowserRouter>
  )
}

export default App
