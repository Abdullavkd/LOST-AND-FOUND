
import DataContext from '../Context/DataContext';
import ItemCard from '../Components/ItemCard';
import { memo } from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import api from '../Services/api';

const Home = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const getItems = async () => {
            try {
                const res = await api.get('/api/items');
                setProducts(res.data);
                console.log(res)
            } catch (error) {
                console.log(error)
            }
        }
        getItems();
    },[])
    
    const timeStanp = (postDate) => {
        const msPerMinute = 60 * 1000;
        const msPerHour = msPerMinute * 60;
        const msPerDay = msPerHour * 24;
        const currValue = Date.now() - postDate;

        if(currValue < msPerMinute) return "Just Now"
        if(currValue < msPerHour) return Math.round(currValue / msPerMinute) + "Minutes ago";
        if(currValue < msPerDay) return Math.round(currValue / msPerHour) + "Hours ago";
        return Math.round(currValue / msPerDay) + "Days ago"
    }
    

  return (
    <div>

        {/* All items here */}
      <div className='flex flex-wrap justify-between gap-3'>
        {products.map(val => (
            <ItemCard key={val._id} item={val.item} image={val.image} country={val.country} location={val.location} date={val.date} state={val.state} type={val.type} id={val._id}/>
        ))}
      </div>
    </div>
  );
};

export default memo(Home);