import { Pencil, Trash2 } from 'lucide-react';
import { useMemo } from 'react';
import { useState } from 'react';
import { memo } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import api from '../Services/api';

const ItemCard = ({item, image, location, state, country, date, type, id, permission, isDeleted}) => {
    const [now] = useState(() => Date.now())
    const navigate = useNavigate();

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


    /**
     * Fucntion to Delete Item
     */
    const deleteItem = async () => {
        const confirmDelete = confirm("Are You Sure You Want to Delete this Item ?")
        if(confirmDelete) {
            try {
                await api.delete(`/api/items/${id}`);
                isDeleted();
                alert("Delete Successfull!")
            } catch (error) {
                console.log(error);
                alert("Deletion Failed")
            }
        }
    }


  return (
      <div className=' rounded-3xl p-3 relative bg-white hover:scale-101 cursor-pointer' onClick={() => navigate(`postdetails/${id}`)}>
          {permission ? <div className='flex gap-3'><button onClick={deleteItem} className='bg-red-500 p-2 rounded-full absolute text-white left-4 top-4 opacity-65'><Trash2 className='w-5 h-5'/></button><Link to={`/editpost/${id}`} className='bg-gray-400 p-2 rounded-full absolute text-white left-14 top-4 opacity-65'><Pencil className='w-5 h-5'/></Link></div>  :<div></div> }
        <div className={`absolute text-white top-5 right-5 px-3 text-sm rounded ${type == "Lost" ? 'bg-red-600' : 'bg-green-600'}`}>{type}</div>
        <div className='h-43 rounded-2xl w-full overflow-hidden bg-gray-100'>
          <img src={`${image}`} alt="" className='h-45'/>
        </div>
        <div className='mt-3 w-full'>
          <p className='text-2xl font-bold'>{item}</p>
          <div className='w-full'>
              <p>{location}, {state}, {country}</p>
              <div className='flex justify-between w-full items-center'>
                  <p>{timeAgo}</p>
                  <Link to={`/postdetails/${id}`} className={` px-5 py-1 rounded-full text-white ${type == "Lost" ? 'bg-red-600' : 'bg-green-600'}`}>View Details</Link>
              </div>
          </div>
        </div>
      </div>
  );
};

export default memo(ItemCard);