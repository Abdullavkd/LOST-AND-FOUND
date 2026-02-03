
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './Components/Navbar'
import ItemCard from './Components/ItemCard'
import Home from './pages/Home'
import DataProvider from './Provider/DataProvider'
import PostItem from './pages/PostItem'
import PostDetails from './pages/PostDetails'
import Login from './pages/Login'
import Register from './pages/Register'
import MyPosts from './pages/MyPosts'

function App() {

  return (
    <BrowserRouter>
    <DataProvider>
      <div className='max-w-301 m-auto flex flex-col gap-3'>
        <Navbar />
        <Routes>
          <Route path='/' element ={<Home/>}/>
          <Route path='/postitem' element={<PostItem/>}/>
          <Route path='/postdetails/:id' element={<PostDetails/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/myposts' element={<MyPosts/>}/>
        </Routes>
      </div>
    </DataProvider>
    </BrowserRouter>
  )
}

export default App
