import { useState } from 'react';
import { memo } from 'react';
import api from '../Services/api';
import { useEffect } from 'react';
import ItemCard from '../Components/ItemCard';
import { ArrowLeft } from 'lucide-react';
import { Link, Navigate, useNavigate } from 'react-router-dom';

const MyPosts = () => {
    const [myPost, setMyPost] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const [userId, setUserId] = useState("");

    const navigate = useNavigate();
    
    useEffect(() => {
        const myPosts = async () => {
            try {
                const res = await api.get('/api/items/myposts');
                setMyPost(res.data)
                // console.log(res.data)
            } catch (error) {
                console.log(error)
            }
        }
        myPosts()
    },[refresh]);

    useEffect(() => {
        const getItems = async () => {
            try {
                const res = await api.get('/userId');
                setUserId(res.data);
                // console.log(res.data)
            } catch (error) {
                console.log(error)
            }
        }
        getItems();
    },[])

    const logout = async () => {
        try {
            const res = await api.post(`/logout/${userId}`);
            console.log(res.data)
            localStorage.removeItem('user');
            navigate('/login')
        } catch (error) {
            console.log(error);
        }
    }
    
    
  return (
    <div>
        <div>
            <div className='flex justify-between'>
                <Link to={-1} className='inline-block'><ArrowLeft className='bg-white rounded-full p-3 w-11 h-11 ml-3 mt-3'/></Link>
                <div className='mr-3 mt-3'><button onClick={() => logout()} className='cursor-pointer bg-orange-600 text-white rounded-full px-5 py-2'>Logout</button></div>
            </div>
            <div className='flex mb-15'>
                <h1 className='text-5xl font-bold m-auto'>My Posts</h1>
            </div>
        </div>
        <div className='grid grid-cols-4 gap-3'>
            {myPost.map(val => (
                <ItemCard key={val._id} item={val.item} image={val.image} country={val.country} location={val.location} date={val.date} state={val.state} type={val.type} id={val._id} permission={true} isDeleted={() => setRefresh(prev => !prev)}/>
            ))}
        </div>
    </div>
  );
};

export default memo(MyPosts);