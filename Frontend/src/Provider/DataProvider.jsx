import { useState } from 'react';
import { memo } from 'react';
import { products } from '../Data/DummyData';
import DataContext from '../Context/DataContext';

const DataProvider = ({children}) => {
    const [product, setProduct] = useState(products);
  return <DataContext.Provider value={{product, setProduct}}>
        {children}
      </DataContext.Provider>
};

export default memo(DataProvider);