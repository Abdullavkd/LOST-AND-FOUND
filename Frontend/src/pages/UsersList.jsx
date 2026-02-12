import { memo, useEffect, useState } from 'react';
import ProfileCard from '../Components/ProfileCard';
import api from '../Services/api';
import { useNavigate } from 'react-router-dom';
import DataContext from '../Context/DataContext';

const UsersList = () => {
    const [users, setUsers] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const [userId, setUserId] = useState('')

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
    <div className='mt-11'>
        <div className='flex justify-center mb-5'><h1 className='text-5xl font-bold'>All Users</h1></div>
        <div className='grid grid-cols-6 gap-3'>
            {users.map((user) => (
                <ProfileCard key={user._id} name={user.name} email={user.email} role={user.role} status={user.status} id={user._id} isDelete={() => setRefresh(prev => !prev)} userId={userId}/>
            ))}
        </div>
    </div>
  );
};

export default memo(UsersList);