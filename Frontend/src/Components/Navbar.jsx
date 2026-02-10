import { Search, User } from 'lucide-react';
import { memo, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import DataContext from '../Context/DataContext';

const Navbar = () => {
  const {setSearchQuery} = useContext(DataContext);
  const [search, setSearch] = useState('');

const handleSubmit = (e) => {
  e.preventDefault();
  setSearchQuery(search)
}

// function to clear search
const clearSearch = () => {
  setSearch('')
  setSearchQuery('')
}
  return (
    <div className='bg-white grid grid-cols-3 py-3 px-9 gap-15 items-center max-w-301 m-auto'>
        <div className='flex gap-7'>
            <Link to={'/'} className='font-black text-2xl' onClick={clearSearch}>Lost & Found</Link>
        </div>
        {/* <div className='flex gap-11'>
            <Link className=' text-xl'>Home</Link>
            <Link className=' text-xl'>All Posts</Link>
            <Link className=' text-xl'>About Us</Link>
            <Link className=' text-xl'>Contact Us</Link>
        </div> */}
      <div className='flex items-center justify-between grow max-w-301 border border-gray-500 rounded-full pl-3 pr-1 bg-white'>
        <div>
            <Search/>
        </div>
          <form onSubmit={handleSubmit} className='flex'>
            <input type="text" placeholder='Search...' className='outline-none p-2 w-full' value={search} onChange={(e) => setSearch(e.target.value)}/>
            <input type="submit" value={'Search'} className='bg-gray-500 text-white px-3 my-1  rounded-full cursor-pointer'/>
          </form>
      </div>
      <div className='flex justify-end gap-9'>
        <Link to={'/postitem'} className='bg-orange-600 rounded-full px-5 p-1 text-white flex items-center' onClick={clearSearch}>Report Item</Link>
        <Link to={`${localStorage.getItem('user') ? '/myposts' : '/login'}`} className='bg-gray-200 rounded-full p-2' onClick={clearSearch}><User/></Link>
      </div>
    </div>
  );
};

export default memo(Navbar);