import { useState } from 'react';
import { memo } from 'react';
import { products, registrations } from '../Data/DummyData';
import DataContext from '../Context/DataContext';

const DataProvider = ({children}) => {
    const [product, setProduct] = useState(products);
    const [registration, setRegistration] = useState(registrations)

    const [searchQuery, setSearchQuery] = useState('')
  return <DataContext.Provider value={{product, setProduct, registration, setRegistration, searchQuery, setSearchQuery}}>
        {children}
      </DataContext.Provider>
};

export default memo(DataProvider);