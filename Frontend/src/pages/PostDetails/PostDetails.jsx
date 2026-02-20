import { ArrowLeft, Camera } from 'lucide-react';
// import { useContext } from 'react';
import { memo } from 'react';
import { Link, useParams } from 'react-router-dom';
import DataContext from '../../Context/DataContext';
import { useEffect } from 'react';
import api from '../../Services/api';
import { useState } from 'react';
import styles from './PostDetails.module.css'

const PostDetails = () => {
    const { id } = useParams();
    
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

    const details = products.find(val => val._id == id);
    
    if(!details) return <h1>Staff Not Found</h1>
    // console.log(details)
  return (
    <div className={styles.parentDiv}>
        <Link to={-1} className={styles.backButton}><ArrowLeft className={styles.arrowLeft}/></Link>
        <div className={styles.mainContentDiv}>
        <div className={styles.titleDiv}>
            <p className={styles.mainTitle}>Post Details</p>
            <p className={styles.subTitle}>Informations About this Post</p>
        </div>
        <div className={styles.bodyDiv}>
            <div className={styles.imageDiv}>
                <div className={styles.imageDivInner}>
                    <div className={styles.imageDivLast}>
                            <Camera className={styles.imageIcon}/>
                        <img src={`${details.image}`} alt="" className={styles.image}/>
                    </div>
                </div>
            </div>
            <div className={styles.contentDiv}>
                <div className={styles.contentDivInner}>
                    <div className={styles.dataDiv}>
                        <p>Title:</p>
                        <p className={styles.dataTitle}>{details.item}</p>
                    </div>
                    <div className={styles.dataDiv}>
                        <p>place:</p>
                        <p className={styles.datas}>{details.location}</p>
                    </div>
                    <div className={styles.dataDiv}>
                        <p>state:</p>
                        <p className={styles.datas}>{details.state}</p>
                    </div>
                    <div className={styles.dataDiv}>
                        <p>country:</p>
                        <p className={styles.datas}>{details.country}</p>
                    </div>
                    <div className={styles.dataDiv}>
                        <p>date:</p>
                        <p className={styles.datas}>{new Date(details.date).toLocaleDateString('en-GB',{'day':'numeric','month': 'short', 'year':'numeric'})}</p>
                    </div>
                    <div className={styles.dataDiv}>
                        <p>type:</p>
                        <p className={styles.datas}>{details.type}</p>
                    </div>
                    <div className={styles.dataDiv}>
                        <p>status:</p>
                        <p className={styles.datas}>{details.status}</p>
                    </div>
                </div>
            </div>
        </div>
        </div>
    </div>
  );
};

export default memo(PostDetails);