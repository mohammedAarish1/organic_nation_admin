import { configureStore } from '@reduxjs/toolkit';

import adminReducer from '../features/admin/adminSlice';
import adminDataReducer from '../features/admin/adminData';


// import adminFeatureReducer from '../features/admin/adminFeatures'

import { setStore } from '../helper/storeUtils';


 const store = configureStore({
    reducer: {
        // product_data: productReducer,
        // filterData: filterReducer, 
        admin: adminReducer,
        adminData: adminDataReducer,
      
    },
})

setStore(store);  // this makes a copy of the store which i had mported in axiosCongig.js file

export default store;