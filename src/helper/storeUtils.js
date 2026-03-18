// this file is created to fix the 'circular dependency error', it helps in creating a copy of the 'store' , whichh i needed to import inside the axiosConfig.js file

let storeInstance = null;

export const setStore = (store) => {
  storeInstance = store;
};

export const getStore = () => storeInstance;