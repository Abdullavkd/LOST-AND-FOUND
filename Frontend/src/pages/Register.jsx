import { ArrowLeft } from 'lucide-react';
import { useContext } from 'react';
import { useState } from 'react';
import { memo } from 'react';
import { Link } from 'react-router-dom';
import DataContext from '../Context/DataContext';

const Register = () => {
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const {registration, setRegistration} = useContext(DataContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!name || !email || !password) return;

        const newUser = {
            id: Date.now(),
            name,
            email,
            password
        }

        // function to add new user
        const addNewUser = (newUser) => {
            setRegistration([...registration, newUser])
            console.log(registration)
        }
        addNewUser(newUser)

        setName('');
        setEmail('')
        setPassword('')
    }
  return (
    <div className='min-h-screen bg-white'>
        <Link to={-1} className='inline-block'><ArrowLeft className='bg-gray-200 rounded-full p-3 w-11 h-11 ml-3 mt-3'/></Link>
        <div className='flex justify-center items-center h-full w-full mt-21'>
            <div className='bg-gray-200 w-101 p-7 rounded-3xl flex flex-col items-center gap-7'>
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