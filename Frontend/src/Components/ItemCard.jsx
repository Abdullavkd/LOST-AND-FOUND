import { useMemo } from 'react';
import { useState } from 'react';
import { memo } from 'react';
import { Link } from 'react-router-dom';

const ItemCard = ({item, image, location, state, country, date, type, id}) => {
    const [now] = useState(() => Date.now())

    const timeAgo = useMemo(() => {
        const msPerMinute = 60 * 1000;
        const msPerHour = msPerMinute * 60;
        const msPerDay = msPerHour * 24;
        const currValue = now - new Date(date).getTime();


        if(currValue < msPerMinute) return "Just Now"
        if(currValue < msPerHour) return Math.round(currValue / msPerMinute) + ` Minute ago`;
        if(currValue < msPerDay) return Math.round(currValue / msPerHour) + ` Hour ago`;
        return Math.round(currValue / msPerDay) + "Days ago"
        
    },[date, now])


  return (
    <div className='w-71 rounded-3xl p-3 relative bg-white'>
      <div className='absolute bg-green-600 text-white top-5 right-5 px-3 text-sm rounded'>{type}</div>
      <div className='h-43 rounded-2xl w-full overflow-hidden bg-gray-100'>
        <img src={`${image}`} alt="" className='h-45'/>
      </div>
      <div className='mt-3 w-full'>
        <p className='text-2xl font-bold'>{item}</p>
        <div className='w-full'>
            <p>{location}, {state}, {country}</p>
            <div className='flex justify-between w-full items-center'>
                <p>{timeAgo}</p>
                <Link to={`/postdetails/${id}`} className='bg-green-600 px-5 py-1 rounded-full text-white'>View Details</Link>
            </div>
        </div>
      </div>
    </div>
  );
};

export default memo(ItemCard);