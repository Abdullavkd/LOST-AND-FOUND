import { ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import { memo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../Services/api';

const Login = () => {
    const [email ,setEmail] = useState('');
    const [password, setPassword] = useState('');

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
            navigate('/')
            // window.location.reload();
        } catch (error) {
            alert(error.response?.data || "Login Failed")
        }

        setEmail('')
        setPassword('')
    }
  return (
    <div className='min-h-screen bg-white'>
        <Link to={-1} className='inline-block'><ArrowLeft className='bg-gray-200 rounded-full p-3 w-11 h-11 ml-3 mt-3'/></Link>
        <div className='flex justify-center items-center h-full w-full mt-21'>
            <div className='bg-gray-200 w-90 md:w-101 mx-3 p-7 rounded-3xl flex flex-col items-center gap-7'>
                <p className='text-4xl font-black'>Login</p>
                <form onSubmit={handleSubmit} className='flex flex-col gap-5 w-full'>
                    <input type="email" placeholder='Enter Email Id'  className='w-full bg-white py-3 px-5 rounded-full text-xl outline-none' value={email} onChange={(e) => setEmail(e.target.value)}/>
                    <input type="password" placeholder='Password' className='w-full bg-white py-3 px-5 rounded-full text-xl outline-none' value={password} onChange={(e) => setPassword(e.target.value)}/>
                    <input type="submit" value='Login' className='bg-blue-800 text-white py-3 rounded-full text-2xl font-bold outline-none'/>
                </form>
                <div>
                    Are you new User ? | <Link to={'/register'} className='text-blue-800'>Register</Link>
                </div>
            </div>
        </div>
    </div>
  );
};

export default memo(Login);