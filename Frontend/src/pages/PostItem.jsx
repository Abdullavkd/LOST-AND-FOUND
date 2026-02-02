import { ImageIcon, User } from 'lucide-react';
import { memo } from 'react';
import { Link } from 'react-router-dom';

const PostItem = () => {
  return (
    <div className='flex flex-col gap-17 bg-white p-17'>
      <div className='flex flex-col items-center'>
        <p className='text-4xl font-bold'>Report An item</p>
        <p className='text-2xl'>Enter Item Details</p>
      </div>
      <div className='flex justify-center h-100 gap-11'>
        <div className=' h-100'>
            <div className='w-full h-full flex justify-center items-center'>
                <div className='h-60 w-60 border flex justify-center items-center overflow-hidden rounded-2xl'>
                    <Link className='absolute'>
                        <ImageIcon className='w-25 h-25 m-auto mb-3'/>
                        <p className='bg-gray-300 py-1 px-3 m-auto border border-gray-500'>Upload Now</p>
                    </Link>
                    <img src="" alt="" className='z-1 h-full'/>
                </div>
            </div>
        </div>
        <div className='w-100'>
            <div>
                <div>
                    <form action="" className='flex flex-col gap-5 bg-gray-100 py-5 px-5 rounded-3xl border border-gray-400'>
                        <input className='py-2 pl-3 rounded-full outline-none bg-white' type="text" placeholder='Item Title' />
                        <input className='py-2 pl-3 rounded-full outline-none bg-white' type="text" placeholder='Place'/>
                        <input className='py-2 pl-3 rounded-full outline-none bg-white' type="text" placeholder='State'/>
                        <input className='py-2 pl-3 rounded-full outline-none bg-white' type="text" placeholder='Country'/>
                        <select name="Select Type" id="" className='outline-none w-51 m-auto text-2xl'>
                            <option value="lost" className=''>Lost</option>
                            <option value="found" className=''>Found</option>
                        </select>
                        <input type="submit" className='bg-blue-600 w-51 py-3 text-white font-bold text-2xl m-auto rounded-full mt-5'/>
                    </form>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default memo(PostItem);