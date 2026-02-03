import { memo } from 'react';
import { Link } from 'react-router-dom';

const ItemCard = ({item, image, location, state, country, date, type}) => {
  return (
    <div className='w-71 rounded-3xl p-3 relative bg-white'>
      <div className='absolute bg-green-600 text-white top-5 left-5 px-3 text-sm rounded'>{type}</div>
      <div className='h-43 rounded-2xl w-full overflow-hidden bg-gray-100'>
        <img src={`${image}`} alt={`${image}`} className='h-45'/>
      </div>
      <div className='mt-3 w-full'>
        <p className='text-2xl font-bold'>{item}</p>
        <div className='w-full'>
            <p>{location}, {state}, {country}</p>
            <div className='flex justify-between w-full items-center'>
                <p>{date}</p>
                <Link to={'/postdetails'} className='bg-green-600 px-5 py-1 rounded-full text-white'>View Details</Link>
            </div>
        </div>
      </div>
    </div>
  );
};

export default memo(ItemCard);