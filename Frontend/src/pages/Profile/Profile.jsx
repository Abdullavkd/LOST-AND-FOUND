import { memo, useState } from 'react';
import { useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import ItemCard from '../../Components/ItemCard/ItemCard';
import { Link, useNavigate, useParams } from 'react-router-dom';
import api from '../../Services/api';
import styles from './Profile.module.css';

const Profile = () => {
    const [myPost, setMyPost] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const [user, setUser] = useState("");
    const {id} = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        const myPosts = async () => {
            try {
                const res = await api.get('/api/items/myposts');
                setMyPost(res.data)
                // console.log(res.data)
            } catch (error) {
                console.log(error)
            }
        }

        const userDetails = async () => {
            try {
                const res = await api.get(`/api/items/user/${id}`)
                setMyPost(res.data)
            } catch (error) {
                console.log(error)
            }
        }
        if(id) userDetails();
        else myPosts()
    },[refresh, id]);



    useEffect(() => {
        const getUserId = async () => {
            try {
                const res = await api.get('/user');
                setUser(res.data);
                // console.log(res.data)
            } catch (error) {
                console.log(error)
            }
        }
        

        const getUser = async () => {
            try {
                const res = await api.get(`/user/${id}`);
                setUser(res.data);
                // console.log(res.data)
            } catch (error) {
                console.log(error)
            }
        }
        

        if(id) getUser();
        else getUserId();
    },[id])


    let logout;
    if(!id) {
        logout = async () => {
            const isConfirm = confirm("Are You Sure To Logout?");
            if(isConfirm) {
                try {
                    await api.post(`/logout/${user._id}`);
                    // console.log(res.data)
                    localStorage.removeItem('user');
                    navigate('/login')
                } catch (error) {
                    console.log(error);
                }
            }
        }
    }
    
    
    
  return (
    <div className={styles.parentDiv}>
        <div>
            <div className={styles.topDiv}>
                <Link to={-1} className={styles.backButton}><ArrowLeft className={styles.arrowLeft}/></Link>
                <div className={styles.topDivOne}>
                    {user.role !== 'admin' && !id ? "":<Link to={'/userslist'} className={styles.allUsers}>All Users</Link>}
                    {!id && <button onClick={() => logout()} className={styles.logout}>Logout</button>}
                </div>
            </div>
        </div>
        <div className={styles.userDetails}>
            <h1 className={styles.profile}>Profile</h1>
            <div className={styles.detailsDiv}>
                <div>
                    <p className={styles.detailsTitle}>Name</p>
                    <p className={styles.detailsContent}>{user.name ? user.name :"Loading" }</p>
                </div>
                <div>
                    <p className={styles.detailsTitle}>Email</p>
                    <p className={styles.detailsContent}>{user.email ? user.email :"Loading" }</p>
                </div>
                <div>
                    <p className={styles.detailsTitle}>Role</p>
                    <p className={styles.detailsContent}>{user.role ? user.role :"Loading" }</p>
                </div>
                <div>
                    <p className={styles.detailsTitle}>Status</p>
                    <p className={styles.detailsContent}>{user.status ? user.status :"Loading" }</p>
                </div>
            </div>
        </div>
        <div className={styles.postsDiv}>
                <h1 className={styles.postsTitle}>{myPost.length < 1 ? "No Posts" : id ? "Posts" : "My Posts"}</h1>
            </div>
        <div className={styles.allPosts}>
            {myPost.map(val => (
                <ItemCard key={val._id} item={val.item} image={val.image} country={val.country} location={val.location} date={val.date} state={val.state} type={val.type} id={val._id} permission={true} isDeleted={() => setRefresh(prev => !prev)}/>
            ))}
        </div>
    </div>
  );
};

export default memo(Profile);