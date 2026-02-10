
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
                // console.log(res)
            } catch (error) {
                console.log(error)
            }
        }
        getItems();
    },[])
    
  return (
    <div>

        {/* All items here */}
      <div className='grid grid-cols-4 gap-3'>
        {products.map(val => (
            <ItemCard key={val._id} item={val.item} image={val.image} country={val.country} location={val.location} date={val.date} state={val.state} type={val.type} id={val._id}/>
        ))}
      </div>
    </div>
  );
};

export default memo(Home);