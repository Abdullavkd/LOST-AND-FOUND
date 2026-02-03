import { useState } from 'react';
import { memo } from 'react';
import { products, registrations } from '../Data/DummyData';
import DataContext from '../Context/DataContext';

const DataProvider = ({children}) => {
    const [product, setProduct] = useState(products);
    const [registration, setRegistration] = useState(registrations)
  return <DataContext.Provider value={{product, setProduct, registration, setRegistration}}>
        {children}
      </DataContext.Provider>
};

export default memo(DataProvider);