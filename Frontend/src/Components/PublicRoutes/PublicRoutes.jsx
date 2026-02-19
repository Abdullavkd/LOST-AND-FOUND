import { memo } from 'react';
import { Navigate } from 'react-router-dom';

const PublicRoutes = ({children}) => {
    const user = localStorage.getItem('user');
    if(user) {
        return <Navigate to='/' replace/>
    }
  return children;
};

export default memo(PublicRoutes);