import { Menu, Search, User, X } from 'lucide-react';
import { memo, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import DataContext from '../Context/DataContext';

const Navbar = () => {
  const {setSearchQuery} = useContext(DataContext);
  const [search, setSearch] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

const handleSubmit = (e) => {
  e.preventDefault();
  setSearchQuery(search)
}

// function to clear search
const clearSearch = () => {
  setSearch('')
  setSearchQuery('')
  setIsMenuOpen(false);
}
  return (
    <nav className='bg-white sticky top-0 z-50 border-b border-gray-100'>
      <div className='max-w-7xl mx-auto px-4 md:px-9 h-auto md:h-20 flex flex-col md:flex-row md:items-center justify-between py-3 md:py-0 gap-4'>
        
        {/* Logo and Mobile Icons */}
        <div className='flex items-center justify-between w-full md:w-auto'>
          <Link to={'/'} className='font-black text-2xl shrink-0' onClick={clearSearch}>
            {/* <img src='https://i.ibb.co/fGyjjQg0/Untitled-design-2-1.png' alt='Logo' className='h-9 md:h-11'/> */}
            <img src='https://i.ibb.co/BVsVCff0/2.png' alt='Logo' className='h-7 sm:h-8'/>
          </Link>

          {/*  User & Actions (Visible only on small screens) */}
          <div className='flex md:hidden items-center gap-3'>
            <Link to={'/myposts'} onClick={clearSearch}>
              <User className='w-6 h-6 text-gray-600' />
            </Link>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Search Bar (Full width on mobile, max-width on desktop) */}
        <div className={`${isMenuOpen ? 'flex' : 'hidden'} md:flex items-center grow justify-center w-full md:max-w-1/4 lg:max-w-md xl:max-w-xl`}>
          <div className='flex items-center w-full border border-gray-300 rounded-full pl-3 pr-1 bg-gray-50 focus-within:bg-white focus-within:border-orange-500'>
            <Search size={18} className='text-gray-400'/>
            <form onSubmit={handleSubmit} className='flex w-full'>
              <input 
                type="text" 
                placeholder='Search items...' 
                className='outline-none p-2 w-full bg-transparent text-sm' 
                value={search} 
                onChange={(e) => setSearch(e.target.value)}
              />
              <button 
                type="submit" 
                className='bg-orange-600 text-white px-4 py-1.5 my-1 rounded-full text-xs font-bold hover:bg-orange-700 transition-colors'
              >
                SEARCH
              </button>
            </form>
          </div>
        </div>

        {/* Desktop Actions (Hidden on mobile) */}
        <div className='hidden md:flex items-center justify-end gap-4 lg:gap-8'>
          <Link 
            to={'/postitem'} 
            className='bg-orange-600 hover:bg-orange-700 rounded-full px-6 py-2 text-white text-sm font-bold transition-all whitespace-nowrap' 
            onClick={clearSearch}
          >
            Report Item
          </Link>
          <Link 
            to={'/myposts'} 
            className='bg-gray-100 hover:bg-gray-200 rounded-full p-2.5 transition-colors' 
            onClick={clearSearch}
          >
            <User size={20} className='text-gray-700'/>
          </Link>
        </div>

        {/* Mobile Expandable Menu */}
        {isMenuOpen && (
          <div className='md:hidden flex flex-col gap-3 pb-4'>
            <Link 
              to={'/postitem'} 
              className='bg-orange-600 text-white text-center py-3 rounded-xl font-bold'
              onClick={clearSearch}
            >
              Report Item
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default memo(Navbar);