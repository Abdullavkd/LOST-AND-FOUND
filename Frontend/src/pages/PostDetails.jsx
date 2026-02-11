import { ArrowLeft, Camera } from 'lucide-react';
// import { useContext } from 'react';
import { memo } from 'react';
import { Link, useParams } from 'react-router-dom';
import DataContext from '../Context/DataContext';
import { useEffect } from 'react';
import api from '../Services/api';
import { useState } from 'react';

const PostDetails = () => {
    const { id } = useParams();
    
    const [products, setProducts] = useState([]);
    
    useEffect(() => {
        const getItems = async () => {
            try {
                const res = await api.get('/api/items');
                setProducts(res.data);
                // console.log(res)
            } catch (error) {
                console.log(error)
            }
        }
        getItems();
    },[])

    const details = products.find(val => val._id == id);
    
    if(!details) return <h1>Staff Not Found</h1>
    // console.log(details)
  return (
    <div className='bg-white'>
        <Link to={-1} className='inline-block'><ArrowLeft className='bg-gray-200 rounded-full p-3 w-11 h-11 ml-3 mt-3'/></Link>
        <div className='flex flex-col gap-9 bg-white p-17 min-h-screen'>
        <div className='flex flex-col items-center'>
            <p className='text-5xl md:text-6xl font-bold'>Post Details</p>
            <p className='text-2xl md:text-3xl'>Informations About this Post</p>
        </div>
        <div className='flex justify-center md:h-100 gap-11 items-center flex-col md:flex-row'>
            <div className='h-80 w-100'>
                <div className='w-full h-full object-cover flex justify-center items-center'>
                    <div className='h-full w-full object-cover flex justify-center items-center overflow-hidden rounded-2xl'>
                            <Camera className='w-25 h-25 m-auto mb-3 absolute'/>
                        <img src={`${details.image}`} alt="" className='z-1 h-full w-full object-cover'/>
                    </div>
                </div>
            </div>
            <div className='w-101 flex items-center justify-center'>
                <div className='w-full text-2xl flex flex-col gap-3 bg-gray-100 p-5 rounded-2xl'>
                    <div className='flex justify-between w-full'>
                        <p>Title:</p>
                        <p className='text-3xl font-bold'>{details.item}</p>
                    </div>
                    <div className='flex justify-between w-full'>
                        <p>place:</p>
                        <p className='text-2xl font-bold'>{details.location}</p>
                    </div>
                    <div className='flex justify-between w-full'>
                        <p>state:</p>
                        <p className='text-2xl font-bold'>{details.state}</p>
                    </div>
                    <div className='flex justify-between w-full'>
                        <p>country:</p>
                        <p className='text-2xl font-bold'>{details.country}</p>
                    </div>
                    <div className='flex justify-between w-full'>
                        <p>date:</p>
                        <p className='text-2xl font-bold'>{new Date(details.date).toLocaleDateString('en-GB',{'day':'numeric','month': 'short', 'year':'numeric'})}</p>
                    </div>
                    <div className='flex justify-between w-full'>
                        <p>type:</p>
                        <p className='text-2xl font-bold'>{details.type}</p>
                    </div>
                    <div className='flex justify-between w-full'>
                        <p>status:</p>
                        <p className='text-2xl font-bold'>{details.status}</p>
                    </div>
                </div>
            </div>
        </div>
        </div>
    </div>
  );
};

export default memo(PostDetails);