import { ImageIcon, User } from 'lucide-react';
import { useContext } from 'react';
import { useState } from 'react';
import { memo } from 'react';
import { Link } from 'react-router-dom';
import DataContext from '../Context/DataContext';

const PostItem = () => {
    const [item, setItem] = useState('');
    const [location, setLocation] = useState();
    const [state, setState] = useState()
    const [country, setCountry] = useState();
    const [type, setType] = useState();

    const {product, setProduct} = useContext(DataContext);

    // function to add new item
    const addNewItem = (newItem) => {
        setProduct([...product, newItem])
    }
    console.log(product)

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!item, !location, !state, !country, !type) return;

        const newItem = {
            id: Date.now(),
            item,
            location,
            state,
            country,
            type,
            image: "",
            date: Date.now(),
            statue: "Active"
        }

        addNewItem(newItem)

        setItem("");
        setLocation('');
        setState('');
        setCountry('');
        setType('');
    }
  return (
    <div className='flex flex-col gap-17 bg-white p-17 min-h-screen'>
      <div className='flex flex-col items-center'>
        <p className='text-4xl font-bold'>Report An item</p>
        <p className='text-2xl'>Enter Item Details</p>
      </div>
      <div className='flex justify-center h-100 gap-11'>
        <div className=' h-100'>
            <div className='w-full h-full flex justify-center items-center'>
                <div className='h-60 w-60 border flex justify-center items-center overflow-hidden rounded-2xl'>
                    <Link className='absolute'>
                        <ImageIcon className='w-25 h-25 m-auto mb-3'/>
                        <p className='bg-gray-300 py-1 px-3 m-auto border border-gray-500'>Upload Now</p>
                    </Link>
                    <img src="" alt="" className='z-1 h-full'/>
                </div>
            </div>
        </div>
        <div className='w-100'>
            <div>
                <div>
                    <form onSubmit={handleSubmit} className='flex flex-col gap-5 bg-gray-100 py-5 px-5 rounded-3xl border border-gray-400'>
                        <input className='py-2 pl-3 rounded-full outline-none bg-white' type="text" placeholder='Item Title' value={item} onChange={(e) => setItem(e.target.value)}/>
                        <input className='py-2 pl-3 rounded-full outline-none bg-white' type="text" placeholder='Place' value={location} onChange={(e) => setLocation(e.target.value)}/>
                        <input className='py-2 pl-3 rounded-full outline-none bg-white' type="text" placeholder='State' value={state} onChange={(e) => setState(e.target.value)}/>
                        <input className='py-2 pl-3 rounded-full outline-none bg-white' type="text" placeholder='Country' value={country} onChange={(e) => setCountry(e.target.value)}/>
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

export default memo(PostItem);