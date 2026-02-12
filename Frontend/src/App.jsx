
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
import Profile from './pages/Profile'
import EditItem from './pages/EditItem'
import ProtectedRoutes from './Components/ProtectedRoutes'
import PublicRoutes from './Components/PublicRoutes'
import UsersList from './pages/UsersList'

function App() {

  return (
    <BrowserRouter>
    <DataProvider>
      <div className='mb-3 bg-white border-b'><Navbar /></div>
      <div className='max-w-351 m-auto flex flex-col gap-3'>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/postitem' element={<ProtectedRoutes><PostItem/></ProtectedRoutes>}/>
          <Route path='/postdetails/:id' element={<PostDetails/>}/>
          <Route path='/login' element={<PublicRoutes><Login/></PublicRoutes>}/>
          <Route path='/logout/:id' element={<PublicRoutes><Login/></PublicRoutes>}/>
          <Route path='/register' element={<PublicRoutes><Register/></PublicRoutes>}/>
          <Route path='/profile' element={<ProtectedRoutes><Profile/></ProtectedRoutes>}/>
          <Route path='/profile/:id' element={<ProtectedRoutes><Profile/></ProtectedRoutes>}/>
          <Route path='/editpost/:id' element={<ProtectedRoutes><EditItem/></ProtectedRoutes>}/>
          <Route path='/userslist' element={<ProtectedRoutes><UsersList/></ProtectedRoutes>}/>
        </Routes>
      </div>
    </DataProvider>
    </BrowserRouter>
  )
}

export default App
