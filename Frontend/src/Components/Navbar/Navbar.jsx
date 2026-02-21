import { Menu, Search, User, X } from 'lucide-react';
import { memo, useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Context from '../../Context/DataContext';
import styles from './Navbar.module.css';

const Navbar = () => {
  const {setSearchQuery, refreshNavbar} = useContext(Context);
  const [search, setSearch] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(false);
  
  useEffect(() => {
    const refresh = () => {
      setUser(JSON.parse(localStorage.getItem('user')));
    }
    refresh();
  },[refreshNavbar])
  user;

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
    <nav className={styles.mainDiv}>
      <div className={styles.innerDiv}>
        
        {/* Logo and Mobile Icons */}
        <div className={styles.logoDiv}>
          <Link to={'/'} className={styles.logo} onClick={clearSearch}>
            {/* <img src='https://i.ibb.co/fGyjjQg0/Untitled-design-2-1.png' alt='Logo' className='h-9 md:h-11'/> */}
            <img src='https://i.ibb.co/BVsVCff0/2.png' alt='Logo' className='h-7 sm:h-8'/>
          </Link>

          {/*  User & Actions (Visible only on small screens) */}
          <div className={styles.userSmScreen}>
            <Link to={'/profile'} onClick={clearSearch}>
              <User className={styles.userIcon} />
            </Link>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Search Bar (Full width on mobile, max-width on desktop) */}
        <div className={`${isMenuOpen ? 'flex' : 'hidden'} ${styles.searchBarDiv}`}>
          <div className={styles.searchBar}>
            <Search size={18} className='text-gray-400'/>
            <form onSubmit={handleSubmit} className='flex w-full'>
              <input 
                type="text" 
                placeholder='Search items...' 
                className={styles.inputField} 
                value={search} 
                onChange={(e) => setSearch(e.target.value)}
              />
              <button 
                type="submit" 
                className={styles.searchButton}
              >
                SEARCH
              </button>
            </form>
          </div>
        </div>

        {/* Desktop Actions (Hidden on mobile) */}
        <div className={styles.desktopActionDiv}>
          <Link 
            to={'/postitem'} 
            className={styles.reportItem} 
            onClick={clearSearch}
          >
            Report Item
          </Link>
          <Link 
            to={'/profile'} 
            className={styles.user} 
            onClick={clearSearch}
          >
            <User size={20} className={styles.userIcon}/>
          </Link>
        </div>

        {/* Mobile Expandable Menu */}
        {isMenuOpen && (
          <div className={styles.mobileMenuDiv}>
            <Link 
              to={'/postitem'} 
              className={styles.reportItemTwo}
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