
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home/Home'
import PostItem from './pages/PostItem/PostItem'
import PostDetails from './pages/PostDetails/PostDetails'
import Login from './pages/Login/Login'
import Profile from './pages/Profile/Profile'
import EditItem from './pages/EditItem/EditItem'
import Register from './pages/Register/Register'
import Navbar from './Components/Navbar/Navbar'
import ProtectedRoutes from './Components/ProtectedRoutes/ProtectedRoutes'
import PublicRoutes from './Components/PublicRoutes/PublicRoutes'
import UsersList from './pages/UsersList/UsersList'
import DataProvider from './Provider/DataProvider'


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
