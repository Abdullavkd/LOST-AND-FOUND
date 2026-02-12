import { Ellipsis } from 'lucide-react';
import { memo } from 'react';

const ProfileCard = () => {
  return (
    <div>
      <div className=' bg-white rounded-3xl flex flex-col items-center p-5 '>
            <Ellipsis className='ml-auto size-5'/>
            <div className='bg-gray-300 rounded-full h-27 w-27 mb-5 flex items-center justify-center text-4xl font-black'>AB</div>
            <p className='text-blue-900 font-bold'>Name Here</p>
            <p>Email Here</p>
            <p className='text-sm'>Role Here</p>
            <p className='text-sm'>Status Here</p>
        </div>
    </div>
  );
};

export default memo(ProfileCard);