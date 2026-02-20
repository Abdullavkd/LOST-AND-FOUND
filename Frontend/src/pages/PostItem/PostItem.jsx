import { ArrowLeft, ImageIcon, User } from 'lucide-react';
import { useState } from 'react';
import { memo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import DataContext from '../../Context/DataContext';
import api from '../../Services/api';
import { useEffect } from 'react';
import styles from './PostItem.module.css'

const PostItem = () => {
    const [item, setItem] = useState('');
    const [location, setLocation] = useState();
    const [state, setState] = useState()
    const [country, setCountry] = useState();
    const [type, setType] = useState();
    const [image, setImage] =useState();
    const navigate = useNavigate();

    useEffect(() => {
        const permission = localStorage.getItem('user')
        if(!permission) navigate('/login')
    },[navigate])

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!item || !location || !state || !country || !type || !image) return alert("All Fields are Required!")


        try {
            const response = await api.post('/api/items',{item, location, state, country, type, image});
            alert(response.data.message);
            navigate('/')
        } catch (error) {
            alert(error.data.message || "Product Adding Failed")
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
        <Link to={-1} className={styles.backButton}><ArrowLeft className={styles.arrowLeft}/></Link>
        <div className={styles.mainContentDiv}>
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
                        <img src={`${image}`} alt="image" className={styles.image}/>
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
                                    <button key={r} type='button' onClick={() => setType(r)} className={`${styles.inputButton} ${type === r ? type === 'Lost'? 'bg-red-700 text-white' : 'bg-green-700 text-white' : 'bg-gray-300'}`}>
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
    </div>
  );
};

export default memo(PostItem);