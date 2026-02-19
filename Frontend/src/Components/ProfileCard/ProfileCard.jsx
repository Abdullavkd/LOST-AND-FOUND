import { EllipsisVertical } from 'lucide-react';
import { memo } from 'react';
import api from '../../Services/api';
import { Link } from 'react-router-dom';

const ProfileCard = ({name, email, role, status, id, isDelete, userId, isOpen, isOpenAny}) => {
  // const [isOpen, setIsOpen] = useState(false);

  const profile = name.split(' ').map(val => val[0].toUpperCase());
  const profileIcon = profile.length > 2 ? profile.slice(0,2) : profile;


    // function to delete user
    const deleteUser = async (e) => {
      e.stopPropagation()
      e.preventDefault()
      const isConfirm = confirm("Are You Sure Delete?")
      if(isConfirm) {
        try {
          await api.delete(`/delete/${id}`)
          isDelete()
        } catch (error) {
          console.log(error)
        }
      }
    }
    
    let profileCol;
    if(profileIcon[0] >= 'A' && profileIcon <= 'E') profileCol = 'bg-green-300';
    else if(profileIcon[0] >= 'F' && profileIcon <= 'J') profileCol = 'bg-yellow-300';
    else if(profileIcon[0] >= 'K' && profileIcon <= 'P') profileCol = 'bg-orange-300';
    else if(profileIcon[0] >= 'Q' && profileIcon <= 'U') profileCol = 'bg-pink-300';
    else if(profileIcon[0] >= 'V' && profileIcon <= 'Z') profileCol = 'bg-red-300';
  return (
    <Link to={(id === userId) ? '/profile' : `/profile/${id}}`}><div className='hover:scale-102'>
      <div className=' bg-white rounded-3xl flex flex-col items-center p-5 '>
        {id !== userId ? isOpen && (
          <div className='relative'>
            <button className='absolute bg-white w-21 p-1 -left-5 hover:bg-gray-200 shadow cursor-pointer'
            onClick={deleteUser}
            >Delete</button>
          </div>
        ): <p className='size-5 font-bold'>You</p>}
            {id !== userId ?<div className='flex justify-end w-full'><button
            onClick={(e) => {isOpenAny(prev => !prev);e.stopPropagation();e.preventDefault()}}
            className='cursor-pointer'>
              <EllipsisVertical className='size-5'/>
            </button></div>: null}
            <div className={`bg-gray-300 rounded-full h-27 w-27 mb-5 flex items-center justify-center text-4xl font-black ${profileCol}`}>{profileIcon}</div>
            <p className='text-blue-900 font-bold truncate text-center'>{name}</p>
            <p className='text-sm truncate w-full text-center'>{email}</p>
            <p className='text-sm truncate text-center'>{role}</p>
            <p className='text-sm truncate text-center'>{status}</p>
        </div>
    </div></Link>
  );
};

export default memo(ProfileCard);