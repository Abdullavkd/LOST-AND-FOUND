import { Camera } from 'lucide-react';
import { memo } from 'react';
import { Link } from 'react-router-dom';

const PostDetails = () => {
  return (
    <div className='flex flex-col gap-9 bg-white p-17 min-h-screen'>
      <div className='flex flex-col items-center'>
        <p className='text-4xl font-bold'>Post Details</p>
        <p className='text-2xl'>Informations About this Post</p>
      </div>
      <div className='flex justify-center h-100 gap-11'>
        <div className=' h-100'>
            <div className='w-full h-full flex justify-center items-center'>
                <div className='h-60 w-60 border flex justify-center items-center overflow-hidden rounded-2xl'>
                        <Camera className='w-25 h-25 m-auto mb-3 absolute'/>
                    <img src="" alt="" className='z-1 h-full'/>
                </div>
            </div>
        </div>
        <div className='w-101 flex items-center justify-center'>
            <div className='w-full text-2xl flex flex-col gap-3 bg-gray-100 p-5 rounded-2xl'>
                <div className='flex justify-between w-full'>
                    <p>Title:</p>
                    <p className='text-3xl font-bold'>I phone 13 Pro</p>
                </div>
                <div className='flex justify-between w-full'>
                    <p>place:</p>
                    <p className='text-2xl font-bold'>Palazhi</p>
                </div>
                <div className='flex justify-between w-full'>
                    <p>state:</p>
                    <p className='text-2xl font-bold'>Kerala</p>
                </div>
                <div className='flex justify-between w-full'>
                    <p>country:</p>
                    <p className='text-2xl font-bold'>India</p>
                </div>
                <div className='flex justify-between w-full'>
                    <p>date:</p>
                    <p className='text-2xl font-bold'>1 Day Ago</p>
                </div>
                <div className='flex justify-between w-full'>
                    <p>type:</p>
                    <p className='text-2xl font-bold'>Loss</p>
                </div>
                <div className='flex justify-between w-full'>
                    <p>status:</p>
                    <p className='text-2xl font-bold'>Active</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default memo(PostDetails);