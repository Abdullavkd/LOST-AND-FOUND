import { useState } from 'react';
import { memo } from 'react';
import api from '../Services/api';
import { useEffect } from 'react';
import ItemCard from '../Components/ItemCard';

const MyPosts = () => {
    const [myPost, setMyPost] = useState([]);
    const [refresh, setRefresh] = useState(false);
    
    useEffect(() => {
        const myPosts = async () => {
            try {
                const res = await api.get('/api/items/myposts');
                setMyPost(res.data)
                console.log(res.data)
            } catch (error) {
                console.log(error)
            }
        }
        myPosts()
    },[refresh]);
    
    
  return (
    <div className='grid grid-cols-4 gap-3'>
      {myPost.map(val => (
        <ItemCard key={val._id} item={val.item} image={val.image} country={val.country} location={val.location} date={val.date} state={val.state} type={val.type} id={val._id} permission={true} isDeleted={() => setRefresh(prev => !prev)}/>
      ))}
    </div>
  );
};

export default memo(MyPosts);