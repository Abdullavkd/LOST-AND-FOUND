import { memo, useEffect, useState } from 'react';
import ProfileCard from '../Components/ProfileCard';
import api from '../Services/api';
import { useNavigate } from 'react-router-dom';

const UsersList = () => {
    const [users, setUsers] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const [userId, setUserId] = useState('')
    const [isOpenId, setIsOpenId] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const getAllUsers = async () => {
            try {
                const res = await api.get('/allusers');
                setUsers(res.data);
            } catch (error) {
                console.log(error)
            }
        }
        getAllUsers();
    },[refresh])

    useEffect(() => {
        const user = async() => {
            try {
                const res = await api.get('/user');
                setUserId(res.data._id)
                if(res.data.role !== "admin") {
                    navigate('/')
                }
            } catch (error) {
                console.log(error)
            }
        }
        user();
    },[navigate])
    
    

    if(users.length < 1) {
        return <p>No Users Found</p>
    }

  return (
    <div className='mt-11 px-3' onClick={(e) => {setIsOpenId(null); e.stopPropagation()}}>
        <div className='flex justify-center mb-5'><h1 className='text-4xl md:text-5xl font-bold'>All Users</h1></div>
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3'>
            {users.map((user) => (
                <ProfileCard key={user._id} name={user.name} email={user.email} role={user.role} status={user.status} id={user._id} isDelete={() => setRefresh(prev => !prev)} userId={userId} isOpen={user._id === isOpenId} isOpenAny={() => setIsOpenId(user._id === isOpenId ? null: user._id)}/>
            ))}
        </div>
    </div>
  );
};

export default memo(UsersList);