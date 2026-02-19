import { memo, useState } from 'react';
import { useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import ItemCard from '../../Components/ItemCard/ItemCard';
import { Link, useNavigate, useParams } from 'react-router-dom';
import api from '../../Services/api';

const Profile = () => {
    const [myPost, setMyPost] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const [user, setUser] = useState("");
    const {id} = useParams();

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

        const userDetails = async () => {
            try {
                const res = await api.get(`/api/items/user/${id}`)
                setMyPost(res.data)
            } catch (error) {
                console.log(error)
            }
        }
        if(id) userDetails();
        else myPosts()
    },[refresh, id]);



    useEffect(() => {
        const getUserId = async () => {
            try {
                const res = await api.get('/user');
                setUser(res.data);
                // console.log(res.data)
            } catch (error) {
                console.log(error)
            }
        }
        

        const getUser = async () => {
            try {
                const res = await api.get(`/user/${id}`);
                setUser(res.data);
                // console.log(res.data)
            } catch (error) {
                console.log(error)
            }
        }
        

        if(id) getUser();
        else getUserId();
    },[id])


    let logout;
    if(!id) {
        logout = async () => {
            const isConfirm = confirm("Are You Sure To Logout?");
            if(isConfirm) {
                try {
                    await api.post(`/logout/${user._id}`);
                    // console.log(res.data)
                    localStorage.removeItem('user');
                    navigate('/login')
                } catch (error) {
                    console.log(error);
                }
            }
        }
    }
    
    
    
  return (
    <div className='flex flex-col gap-5'>
        <div>
            <div className='flex justify-between'>
                <Link to={-1} className='inline-block'><ArrowLeft className='bg-white rounded-full p-3 w-11 h-11 ml-3 mt-3'/></Link>
                <div className='mr-3 mt-3 flex gap-3'>
                    {user.role !== 'admin' && !id ? "":<Link to={'/userslist'} className='cursor-pointer bg-orange-600 text-white rounded-full px-5 py-2 text-sm sm:text-lg'>All Users</Link>}
                    {!id && <button onClick={() => logout()} className='cursor-pointer bg-orange-600 text-white rounded-full px-5 py-2 text-sm sm:text-lg'>Logout</button>}
                </div>
            </div>
        </div>
        <div className='flex flex-col mb-15 mx-3'>
            <h1 className='m-auto text-4xl md:text-5xl font-bold mb-5'>Profile</h1>
            <div className='grid gap-5 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4'>
                <div className=''>
                    <p className='pl-2'>Name</p>
                    <p className='border border-blue-300 text-gray-800 font-bold px-2 py-1 bg-gray-100'>{user.name ? user.name :"Loading" }</p>
                </div>
                <div className=''>
                    <p className='pl-2'>Email</p>
                    <p className='border border-blue-300 text-gray-800 font-bold px-2 py-1 bg-gray-100'>{user.email ? user.email :"Loading" }</p>
                </div>
                <div className=''>
                    <p className='pl-2'>Role</p>
                    <p className='border border-blue-300 text-gray-800 font-bold px-2 py-1 bg-gray-100'>{user.role ? user.role :"Loading" }</p>
                </div>
                <div className=''>
                    <p className='pl-2'>Status</p>
                    <p className='border border-blue-300 text-gray-800 font-bold px-2 py-1 bg-gray-100'>{user.status ? user.status :"Loading" }</p>
                </div>
            </div>
        </div>
        <div className='flex'>
                <h1 className='text-4xl md:text-5xl font-bold m-auto mb-3 '>{myPost.length < 1 ? "No Posts" : id ? "Posts" : "My Posts"}</h1>
            </div>
        <div className='grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
            {myPost.map(val => (
                <ItemCard key={val._id} item={val.item} image={val.image} country={val.country} location={val.location} date={val.date} state={val.state} type={val.type} id={val._id} permission={true} isDeleted={() => setRefresh(prev => !prev)}/>
            ))}
        </div>
    </div>
  );
};

export default memo(Profile);