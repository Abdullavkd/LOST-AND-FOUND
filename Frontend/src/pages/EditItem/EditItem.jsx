import { ImageIcon, User } from 'lucide-react';
import { useState } from 'react';
import { memo } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import DataContext from '../../Context/DataContext';
import api from '../../Services/api';
import { useEffect } from 'react';
import styles from './EditItem.module.css'

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
    <div className={styles.parentDiv}>
      <div className={styles.titleDiv}>
        <p className={styles.mainTitle}>Report An item</p>
        <p className={styles.subTitle}>Enter Item Details</p>
      </div>
      <div className={styles.bodyDiv}>
        <div className={styles.imageParent}>
            <div className={styles.imageParentDiv}>
                <div className={styles.imageDiv}>
                    <Link className={styles.imageLink}>
                        <ImageIcon className={styles.imageIcon}/>
                        {/* <p className='bg-gray-300 py-1 px-3 m-auto border border-gray-500'>Upload Now</p> */}
                    </Link>
                    <img src={`${image}`} alt="" className={styles.image}/>
                </div>
            </div>
        </div>
        <div className='w-85 sm:w-100'>
            <div>
                <div>
                    <form onSubmit={handleSubmit} className={styles.form}>
                        <input className={styles.input} type="text" placeholder='Item Title' value={item} onChange={(e) => setItem(e.target.value)}/>
                        <input className={styles.input} type="text" placeholder='Place' value={location} onChange={(e) => setLocation(e.target.value)}/>
                        <input className={styles.input} type="text" placeholder='State' value={state} onChange={(e) => setState(e.target.value)}/>
                        <input className={styles.input} type="text" placeholder='Country' value={country} onChange={(e) => setCountry(e.target.value)}/>
                        <input className={styles.input} type="text" placeholder='Image URL' value={image} onChange={(e) => setImage(e.target.value)}/>
                        <div className={styles.type}>
                            {["Lost", "Found"].map((r) => (
                                <button key={r} type='button' onClick={() => setType(r)} className={`py-1 w-25 rounded-full ${type === r ? type === 'Lost'? 'bg-red-700 text-white' : 'bg-green-700 text-white' : 'bg-gray-300'}`}>
                                    {r}
                                </button>
                            ))}
                        </div>
                        <input type="submit" className={styles.submit}/>
                    </form>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default memo(EditItem);