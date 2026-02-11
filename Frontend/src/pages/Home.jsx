
import DataContext from '../Context/DataContext';
import ItemCard from '../Components/ItemCard';
import { memo, useContext } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import api from '../Services/api';

const Home = () => {
    const [products, setProducts] = useState([]);
    const {searchQuery} = useContext(DataContext)

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


    // filter products for search
    const filteredProducs = products.filter(val => {
      const query = searchQuery.toLowerCase();
      return (
        val.item.toLowerCase().includes(query) ||
        val.location.toLowerCase().includes(query)
      )
    })

    if(filteredProducs.length < 1) {
      return <h1 className='text-2xl m-auto font-bold'>No Item</h1>
    }
    
  return (
    <div className=''>

        {/* All items here */}
      <div className='grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
        {filteredProducs.map(val => (
            <ItemCard key={val._id} item={val.item} image={val.image} country={val.country} location={val.location} date={val.date} state={val.state} type={val.type} id={val._id}/>
        ))}
      </div>
    </div>
  );
};

export default memo(Home);