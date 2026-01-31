import { Search } from 'lucide-react';
import { memo } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const ButtonOne = useNavigate;
  return (
    <div className='bg-green-300 grid grid-cols-3 py-3 px-3 gap-15 items-center'>
        <div className='flex gap-7'>
            <Link className='font-black text-2xl'>Logo</Link>
            <Link className='font-black text-2xl'>company Name</Link>
        </div>
        <div className='flex gap-11'>
            <Link className=' text-xl'>Home</Link>
            <Link className=' text-xl'>All Posts</Link>
            <Link className=' text-xl'>About Us</Link>
            <Link className=' text-xl'>Contact Us</Link>
        </div>
      <div className='flex items-center justify-between grow max-w-201 border border-gray-500 rounded-full px-3 bg-white'>
        <input type="text" placeholder='Search...' className='outline-none p-2'/>
        <div>
        <Search/>
      </div>
      </div>
    </div>
  );
};

export default memo(Navbar);