
import DataContext from '../Context/DataContext';
import ItemCard from '../Components/ItemCard';
import { memo, useContext } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    const {product} = useContext(DataContext);
  return (
    <div>

        {/* All items here */}
      <div className='flex flex-wrap justify-between gap-3'>
        {product.map(val => (
            <ItemCard key={val.id} item={val.item} image={val.image} country={val.country} location={val.location} date={val.date} state={val.state} type={val.type}/>
        ))}
      </div>
    </div>
  );
};

export default memo(Home);