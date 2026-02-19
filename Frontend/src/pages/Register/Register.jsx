import { ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import { memo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import DataContext from '../../Context/DataContext';
import api from '../../Services/api';

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
    <div className='min-h-screen bg-white'>
        <Link to={-1} className='inline-block'><ArrowLeft className='bg-gray-200 rounded-full p-3 w-11 h-11 ml-3 mt-3'/></Link>
        <div className='flex justify-center items-center h-full w-full mt-21'>
            <div className='bg-gray-200 w-90 md:w-101 mx-3 p-7 rounded-3xl flex flex-col items-center gap-7'>
                <p className='text-4xl font-black'>Register</p>
                <form onSubmit={handleSubmit} className='flex flex-col gap-5 w-full'>
                    <input type="text" placeholder='Enter Your Name'  className='w-full bg-white py-3 px-5 rounded-full text-xl outline-none' value={name} onChange={(e) => setName(e.target.value)}/>
                    <input type="email" placeholder='Enter Email Id'  className='w-full bg-white py-3 px-5 rounded-full text-xl outline-none' value={email} onChange={(e) => setEmail(e.target.value)}/>
                    <input type="password" placeholder='Enter a Password' className='w-full bg-white py-3 px-5 rounded-full text-xl outline-none' value={password} onChange={(e) => setPassword(e.target.value)}/>
                    <input type="submit" className='bg-blue-800 text-white py-3 rounded-full text-2xl font-bold outline-none'/>
                </form>
                <div>
                    Have you already an Account ? | <Link to={'/login'} className='text-blue-800'>Login</Link>
                </div>
            </div>
        </div>
    </div>
  );
};

export default memo(Register);