
import DataContext from '../../Context/DataContext';
import ItemCard from '../../Components/ItemCard/ItemCard';
import { memo, useContext } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import api from '../../Services/api';
import styles from './Home.module.css'

const Home = () => {
    const [products, setProducts] = useState([]);
    const {searchQuery} = useContext(DataContext)
    const [userRole, setUserRole] = useState('user');
    const [refresh, setRefresh] = useState(false)

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
    },[refresh])


    // take user details
    useEffect(() => {
      if(localStorage.getItem('user')) {
        const getUserRole = async () => {
          try {
            const user = await api.get('/user');
            setUserRole(user.data.role)
          } catch (error) {
            console.log(error);
          }
        }
        getUserRole();
      }
    },[])

    // if admin set full access to delete and edit
    let permission = false;
    if(userRole === 'admin') {
      permission = true;
    }
    console.log(userRole)

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
      <div className={styles.parentDiv}>
        {filteredProducs.map(val => (
            <ItemCard key={val._id} item={val.item} image={val.image} country={val.country} location={val.location} date={val.date} state={val.state} type={val.type} id={val._id} permission={permission} isDeleted={() => setRefresh(prev => !prev)}/>
        ))}
      </div>
    </div>
  );
};

export default memo(Home);