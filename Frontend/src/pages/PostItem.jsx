import { User } from 'lucide-react';
import { memo } from 'react';

const PostItem = () => {
  return (
    <div className='flex flex-col'>
      <div className='flex flex-col items-center'>
        <p className='text-3xl font-bold'>Report An item</p>
        <p>Enter Item Details</p>
      </div>
      <div className='flex justify-center gap-5'>
        <div className='border w-100 h-100'>
            <div className='w-full h-full flex justify-end items-center'>
                <div className='h-70 w-70 border'>
                    <img src={`${<User/>}`} alt={`${<User/>}`} />
                </div>
            </div>
        </div>
        <div className='border w-100 h-100'>
            <div>
                <div>
                    <form action="" className='flex flex-col gap-5'>
                        <input className='py-2 pl-3 rounded-full outline-none bg-white' type="text" placeholder='Item Title' />
                        <input className='py-2 pl-3 rounded-full outline-none bg-white' type="text" placeholder='Place'/>
                        <input className='py-2 pl-3 rounded-full outline-none bg-white' type="text" placeholder='State'/>
                        <input className='py-2 pl-3 rounded-full outline-none bg-white' type="text" placeholder='Country'/>
                        <select name="Select Type" id="" className='outline-none w-51 m-auto' defaultChecked>
                            <option value="lost" className=''>Lost</option>
                            <option value="found" className=''>Found</option>
                        </select>
                        <input type="submit" className='bg-blue-600 w-51 py-3 text-white font-bold text-2xl m-auto rounded-full'/>
                    </form>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default memo(PostItem);