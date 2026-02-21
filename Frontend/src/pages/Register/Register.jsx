import { ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import { memo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import DataContext from '../../Context/DataContext';
import api from '../../Services/api';
import styles from './Register.module.css'

const Register = () => {
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const Navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!name || !email || !password) return alert("All Fields are Required")

        try {
            const response = await api.post('/register',{
                name, email, password
            })
            
            alert(response.data.message);

            setName('');
            setEmail('')
            setPassword('')

            Navigate('/login')
        } catch (error) {
            console.log(error.response.data)
            alert(error.response.data || "Registaration Failed")
        }
    }
  return (
    <div className={styles.parentDiv}>
        <Link to={-1} className={styles.backButton}><ArrowLeft className={styles.arrowLeft}/></Link>
        <div className={styles.registerDiv}>
            <div className={styles.registerDivInner}>
                <p className={styles.registerTitle}>Register</p>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <input type="text" placeholder='Enter Your Name'  className={styles.input} value={name} onChange={(e) => setName(e.target.value)}/>
                    <input type="email" placeholder='Enter Email Id'  className={styles.input} value={email} onChange={(e) => setEmail(e.target.value)}/>
                    <input type="password" placeholder='Enter a Password' className={styles.input} value={password} onChange={(e) => setPassword(e.target.value)}/>
                    <input type="submit" className={styles.submit}/>
                </form>
                <div>
                    Have you already an Account ? | <Link to={'/login'} className={styles.subTitle}>Login</Link>
                </div>
            </div>
        </div>
    </div>
  );
};

export default memo(Register);