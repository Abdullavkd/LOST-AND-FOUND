import { useState } from 'react';
import { memo } from 'react';
import { products, registrations } from '../Data/DummyData';
import Context from '../Context/DataContext';

const DataProvider = ({children}) => {
    const [product, setProduct] = useState(products);
    const [registration, setRegistration] = useState(registrations)
    const [refreshNavbar, setRefreshNavbar] = useState(false)

    const [searchQuery, setSearchQuery] = useState('')
  return <Context.Provider value={{product, setProduct, registration, setRegistration, searchQuery, setSearchQuery, refreshNavbar, setRefreshNavbar}}>
        {children}
      </Context.Provider>
};

export default memo(DataProvider);