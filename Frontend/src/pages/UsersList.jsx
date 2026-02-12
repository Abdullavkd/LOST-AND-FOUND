import { memo } from 'react';
import ProfileCard from '../Components/ProfileCard';

const UsersList = () => {
    
  return (
    <div className='mt-11'>
        <div className='flex justify-center mb-5'><h1 className='text-5xl font-bold'>All Users</h1></div>
        <div className='grid grid-cols-6 gap-3'>
            <ProfileCard/>
            <ProfileCard/>
            <ProfileCard/>
            <ProfileCard/>
            <ProfileCard/>
            <ProfileCard/>
            <ProfileCard/>
            <ProfileCard/>
            <ProfileCard/>
            <ProfileCard/>
            <ProfileCard/>
            <ProfileCard/>
        </div>
    </div>
  );
};

export default memo(UsersList);