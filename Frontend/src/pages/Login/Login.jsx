import { ArrowLeft } from 'lucide-react';
import { useContext, useState } from 'react';
import { memo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../Services/api';
import DataContext from '../../Context/DataContext';
import styles from './Login.module.css'

const Login = () => {
    const [email ,setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {setRefreshNavbar} = useContext(DataContext)

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // send request
            const response = await api.post('/login', {email, password});
            // set data to localstorage
            localStorage.setItem('user', JSON.stringify(response.data.user));
            // alert("Login Successful!");
            // navigate to home

            setEmail('')
            setPassword('')
            
            navigate('/')
            setRefreshNavbar((prev) => !prev)
            // window.location.reload();
        } catch (error) {
            alert(error.response?.data || "Login Failed")
        }

        setEmail('')
        setPassword('')
    }
  return (
    <div className={styles.parentDiv}>
        <Link to={-1} className={styles.backButton}><ArrowLeft className={styles.arrowLeft}/></Link>
        <div className={styles.loginDiv}>
            <div className={styles.loginDivInner}>
                <p className={styles.loginTitle}>Login</p>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <input type="email" placeholder='Enter Email Id'  className={styles.input} value={email} onChange={(e) => setEmail(e.target.value)}/>
                    <input type="password" placeholder='Password' className={styles.input} value={password} onChange={(e) => setPassword(e.target.value)}/>
                    <input type="submit" value='Login' className={styles.submit}/>
                </form>
                <div>
                    Are you new User ? | <Link to={'/register'} className={styles.subTitle}>Register</Link>
                </div>
            </div>
        </div>
    </div>
  );
};

export default memo(Login);