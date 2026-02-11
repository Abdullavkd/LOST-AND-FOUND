import { ImageIcon, User } from 'lucide-react';
import { useState } from 'react';
import { memo } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import DataContext from '../Context/DataContext';
import api from '../Services/api';
import { useEffect } from 'react';

const EditItem = () => {
    const {id} = useParams();

    const [item, setItem] = useState();
    const [location, setLocation] = useState();
    const [state, setState] = useState()
    const [country, setCountry] = useState();
    const [type, setType] = useState();
    const [image, setImage] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        const getItems = async () => {
            try {
                const res = await api.get(`/api/items/${id}`);
                const data = res.data;
                setItem(data.item)
                setLocation(data.location);
                setState(data.state);
                setCountry(data.country);
                setType(data.type);
                setImage(data.image)
            } catch (error) {
                console.log(error);
            }
        }
        getItems();
        
    },[id])

    useEffect(() => {
        const permission = localStorage.getItem('user')
        if(!permission) navigate(`/login`)
    },[navigate, id])

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!item, !location, !state, !country, !type) return alert("All Fields are Required!")


        try {
            const response = await api.patch(`/api/items/${id}`,{item, location, state, country, type});
            alert(response.data.message);
            navigate(`/postdetails/${id}`)
        } catch (error) {
            alert(error.data.message || "Product Updating Failed")
        }

        setItem('');
        setLocation('');
        setState('');
        setCountry('');
        setType('');
        setImage('');
    }
  return (
    <div className='flex flex-col gap-17 bg-white p-17 min-h-screen'>
      <div className='flex flex-col items-center'>
        <p className='text-3xl sm:text-5xl md:text-6xl font-bold'>Report An item</p>
        <p className='text-2xl md:text-3xl'>Enter Item Details</p>
      </div>
      <div className='flex justify-center md:h-100 gap-11 items-center flex-col md:flex-row'>
        <div className='w-85 h-75 sm:h-80 sm:w-100 box-border'>
            <div className='w-full h-full object-cover flex justify-center items-center'>
                <div className='h-full w-full object-cover border flex justify-center items-center overflow-hidden rounded-2xl'>
                    <Link className='absolute'>
                        <ImageIcon className='w-25 h-25 m-auto mb-3'/>
                        {/* <p className='bg-gray-300 py-1 px-3 m-auto border border-gray-500'>Upload Now</p> */}
                    </Link>
                    <img src={`${image}`} alt="" className='z-1 h-full w-full object-cover'/>
                </div>
            </div>
        </div>
        <div className='w-85 sm:w-100'>
            <div>
                <div>
                    <form onSubmit={handleSubmit} className='flex flex-col gap-5 bg-gray-100 py-5 px-5 rounded-3xl border border-gray-400'>
                        <input className='py-2 pl-3 rounded-full outline-none bg-white' type="text" placeholder='Item Title' value={item} onChange={(e) => setItem(e.target.value)}/>
                        <input className='py-2 pl-3 rounded-full outline-none bg-white' type="text" placeholder='Place' value={location} onChange={(e) => setLocation(e.target.value)}/>
                        <input className='py-2 pl-3 rounded-full outline-none bg-white' type="text" placeholder='State' value={state} onChange={(e) => setState(e.target.value)}/>
                        <input className='py-2 pl-3 rounded-full outline-none bg-white' type="text" placeholder='Country' value={country} onChange={(e) => setCountry(e.target.value)}/>
                        <input className='py-2 pl-3 rounded-full outline-none bg-white' type="text" placeholder='Image URL' value={image} onChange={(e) => setImage(e.target.value)}/>
                        <div className='flex justify-center gap-5 mt-3'>
                            {["Lost", "Found"].map((r) => (
                                <button key={r} type='button' onClick={() => setType(r)} className={`py-1 w-25 rounded-full ${type === r ? type === 'Lost'? 'bg-red-700 text-white' : 'bg-green-700 text-white' : 'bg-gray-300'}`}>
                                    {r}
                                </button>
                            ))}
                        </div>
                        <input type="submit" className='bg-blue-600 w-51 py-3 text-white font-bold text-2xl m-auto rounded-full mt-5'/>
                    </form>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default memo(EditItem);