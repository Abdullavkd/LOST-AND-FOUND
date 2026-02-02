import { Search, User } from 'lucide-react';
import { memo } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const ButtonOne = useNavigate;
  return (
    <div className='bg-white grid grid-cols-3 py-3 px-9 gap-15 items-center'>
        <div className='flex gap-7'>
            {/* <Link className='font-black text-2xl'>L&F</Link> */}
            <Link to={'/'} className='font-black text-2xl'>Lost & Found</Link>
        </div>
        {/* <div className='flex gap-11'>
            <Link className=' text-xl'>Home</Link>
            <Link className=' text-xl'>All Posts</Link>
            <Link className=' text-xl'>About Us</Link>
            <Link className=' text-xl'>Contact Us</Link>
        </div> */}
      <div className='flex items-center justify-between grow max-w-301 border border-gray-500 rounded-full px-3 bg-white'>
        <div>
            <Search/>
        </div>
        <input type="text" placeholder='Search...' className='outline-none p-2 w-full'/>
      </div>
      <div className='flex justify-end gap-9'>
        <Link to={'/postitem'} className='bg-orange-600 rounded-full px-5 p-1 text-white flex items-center'>Report Item</Link>
        <Link className='bg-gray-200 rounded-full p-2'><User/></Link>
      </div>
    </div>
  );
};

export default memo(Navbar);