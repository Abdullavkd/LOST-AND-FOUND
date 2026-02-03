import { ArrowLeft } from 'lucide-react';
import { memo } from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
  return (
    <div className='min-h-screen bg-white'>
        <Link to={-1} className='inline-block'><ArrowLeft className='bg-gray-200 rounded-full p-3 w-11 h-11 ml-3 mt-3'/></Link>
        <div className='flex justify-center items-center h-full w-full mt-21'>
            <div className='bg-gray-200 w-101 p-7 rounded-3xl flex flex-col items-center gap-7'>
                <p className='text-4xl font-black'>Register</p>
                <form action="" className='flex flex-col gap-5 w-full'>
                    <input type="text" placeholder='Enter Your Name'  className='w-full bg-white py-3 px-5 rounded-full text-xl outline-none'/>
                    <input type="email" placeholder='Enter Email Id'  className='w-full bg-white py-3 px-5 rounded-full text-xl outline-none'/>
                    <input type="password" placeholder='Enter a Password' className='w-full bg-white py-3 px-5 rounded-full text-xl outline-none'/>
                    <input type="submit" placeholder='Login' className='bg-blue-800 text-white py-3 rounded-full text-2xl font-bold outline-none'/>
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