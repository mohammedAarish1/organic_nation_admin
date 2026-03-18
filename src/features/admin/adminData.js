import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const apiUrl = import.meta.env.VITE_BACKEND_URL;

// get total numbers of orders, users, etc..
export const getResourcesCount = createAsyncThunk(
    'adminData/getResourcesCount',
    async (_, { rejectWithValue }) => {
        const adminToken = JSON.parse(sessionStorage.getItem('adminToken'))
        try {
            const response = await axios.get(`${apiUrl}/api/admin/resources/count`, {
                headers: {
                    'Authorization': `Bearer ${adminToken}`,
                    'Content-Type': 'application/json'
                }
            })
            if (response.data.success) {
                return response.data.resourcesCount
            }
        } catch (error) {
            if (error.response && error.response.data) {
                return rejectWithValue(error.response.data);
            } else {
                return rejectWithValue(error.message);
            }
        }
    }
)


// get users, orders, etc.. list
export const getList = createAsyncThunk(
    'adminData/getList',
    async (type, { rejectWithValue }) => {
        const adminToken = JSON.parse(sessionStorage.getItem('adminToken'))
        try {
            const response = await axios.get(`${apiUrl}/api/admin/resources?type=${type}`, {
                headers: {
                    'Authorization': `Bearer ${adminToken}`,
                    'Content-Type': 'application/json'
                }
            })
            return response.data
        } catch (error) {
            if (error.response && error.response.data) {
                return rejectWithValue(error.response.data);
            } else {
                return rejectWithValue(error.message);
            }
        }
    }
);


// get all orders 
// export const getTotalOrders = createAsyncThunk(
//     'adminData/getTotalOrders',
//     async (_, { rejectWithValue }) => {
//         const adminToken = JSON.parse(sessionStorage.getItem('adminToken'));
//         try {
//             const response = await axios.get(`${apiUrl}/api/admin/orders`, {
//                 headers: {
//                     'Authorization': `Bearer ${adminToken}`,
//                     'Content-Type': 'application/json'
//                 }
//             })

//             return response.data;
//         } catch (error) {
//             if (error.response && error.response.data) {
//                 return rejectWithValue(error.response.data);
//             } else {
//                 return rejectWithValue(error.message);
//             }
//         }
//     }
// )
// get all users
// export const getAllUsers = createAsyncThunk(
//     'adminData/getAllUsers',
//     async (_, { rejectWithValue }) => {
//         const adminToken = JSON.parse(sessionStorage.getItem('adminToken'));
//         try {
//             const response = await axios.get(`${apiUrl}/api/admin/users`, {
//                 headers: {
//                     'Authorization': `Bearer ${adminToken}`,
//                     'Content-Type': 'application/json'
//                 }
//             })

//             return response.data;
//         } catch (error) {
//             if (error.response && error.response.data) {
//                 return rejectWithValue(error.response.data);
//             } else {
//                 return rejectWithValue(error.message);
//             }
//         }
//     }
// )
// get all users queris
// export const getAllUserQueries = createAsyncThunk(
//     'adminData/getAllUserQueries',
//     async (_, { rejectWithValue }) => {
//         const adminToken = JSON.parse(sessionStorage.getItem('adminToken'));
//         try {
//             const response = await axios.get(`${apiUrl}/api/admin/queries`, {
//                 headers: {
//                     'Authorization': `Bearer ${adminToken}`,
//                     'Content-Type': 'application/json'
//                 }
//             })

//             return response.data;
//         } catch (error) {
//             if (error.response && error.response.data) {
//                 return rejectWithValue(error.response.data);
//             } else {
//                 return rejectWithValue(error.message);
//             }
//         }
//     }
// )


// generate invoice
export const generateInvoice = createAsyncThunk(
    'adminData/generateInvoice',
    async (orderId, { rejectWithValue }) => {
        const adminToken = JSON.parse(sessionStorage.getItem('adminToken'));
        try {
            const response = await axios.post(
                `${apiUrl}/api/admin/orders/invoice`,
                { orderId },
                {
                    headers: {
                        'Authorization': `Bearer ${adminToken}`,
                        'Content-Type': 'application/json'
                    },
                    responseType: 'blob' // Change back to 'blob'
                }
            );

            const blob = new Blob([response.data], { type: 'application/pdf' });
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `invoice-${orderId}.pdf`);
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);

            return { success: true, message: 'Invoice generated successfully' };
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Failed to generate invoice');
        }
    }
);



// add a new product in the database 
export const addNewProductInDatabase = createAsyncThunk(
    'adminData/addNewProductInDatabase',
    async (data, { rejectWithValue }) => {
        const adminToken = JSON.parse(sessionStorage.getItem('adminToken'));
        try {
            const response = await axios.post(`${apiUrl}/api/admin/products/add`, data, {
                headers: {
                    'Authorization': `Bearer ${adminToken}`,
                    'Content-Type': 'multipart/form-data'  // Changed this line
                }
            });

            return response.data;
        } catch (error) {
            if (error.response && error.response.data) {
                return rejectWithValue(error.response.data);
            } else {
                return rejectWithValue(error.message);
            }
        }
    }
);



// Thunk for updating a product
export const updateExistingProduct = createAsyncThunk(
    'adminData/updateExistingProduct',
    async ({ id, formData }, { rejectWithValue }) => {
        try {
            const response = await axios.put(`${apiUrl}/api/admin/products/update/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

// delete the document fromt the database 
export const deleteDocumentFromDatabase = createAsyncThunk(
    'adminData/deleteDocumentFromDatabase',
    async (data, { rejectWithValue }) => {
        const adminToken = JSON.parse(sessionStorage.getItem('adminToken'));
        try {
            if (adminToken) {
                const response = await axios.delete(`${apiUrl}/api/admin/delete/${data.collection}/${data.id}`, {
                    headers: {
                        'Authorization': `Bearer ${adminToken}`,
                        'Content-Type': 'application/json'
                    }
                });

                return response.data;
            }

        } catch (error) {
            if (error.response && error.response.data) {
                return rejectWithValue(error.response.data);
            } else {
                return rejectWithValue(error.message);
            }
        }
    }
);


// to generate the sale report 
export const generateReport = createAsyncThunk(
    'report/generate',
    async ({ startDate, endDate, type }, { rejectWithValue }) => {
        const adminToken = JSON.parse(sessionStorage.getItem('adminToken'));
        try {
            const response = await axios.post(`${apiUrl}/api/admin/generate/${type}/report`, { startDate, endDate },
                {
                    responseType: 'blob',
                    headers: {
                        'Authorization': `Bearer ${adminToken}`,
                        'Content-Type': 'application/json'  // You can change this based on your API requirements
                    }
                }
            );
            // Instead of returning the blob, we'll handle it here
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${type}Report.xlsx`);
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);

            return { success: true };
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);


// get all returns 
// export const getTotalReturns = createAsyncThunk(
//     'adminData/getTotalReturns',
//     async (_, { rejectWithValue }) => {
//         const adminToken = JSON.parse(sessionStorage.getItem('adminToken'));
//         try {
//             const response = await axios.get(`${apiUrl}/api/admin/returns`, {
//                 headers: {
//                     'Authorization': `Bearer ${adminToken}`,
//                     'Content-Type': 'application/json'
//                 }
//             })

//             return response.data;
//         } catch (error) {
//             if (error.response && error.response.data) {
//                 return rejectWithValue(error.response.data);
//             } else {
//                 return rejectWithValue(error.message);
//             }
//         }
//     }
// )



// add a new banner in the database 
export const addNewBannerInDatabase = createAsyncThunk(
    'adminData/addNewBannerInDatabase',
    async (data, { rejectWithValue }) => {
        const adminToken = JSON.parse(sessionStorage.getItem('adminToken'));
        try {
            const response = await axios.post(`${apiUrl}/api/main/banners/add`, data, {
                headers: {
                    'Authorization': `Bearer ${adminToken}`,
                    'Content-Type': 'multipart/form-data'  // Changed this line
                }
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data.error);
        }
    }
);
// add a new banner in the database 
export const deleteBannerFromDatabase = createAsyncThunk(
    'adminData/deleteBannerFromDatabase',
    async (bannerId, { rejectWithValue }) => {
        const adminToken = JSON.parse(sessionStorage.getItem('adminToken'));
        try {
            const response = await axios.delete(`${apiUrl}/api/main/banners/delete/${bannerId}`, {
                headers: {
                    'Authorization': `Bearer ${adminToken}`,
                    'Content-Type': 'multipart/form-data'  // Changed this line
                }
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data.error);
        }
    }
);


// experiment with images
// export const optimizeImages = createAsyncThunk(
//     'adminData/optimizeImages',
//     async (data, { rejectWithValue }) => {
//         const adminToken = JSON.parse(sessionStorage.getItem('adminToken'));
//         try {
//             const response = await axios.post(`${apiUrl}/api/admin/product/upload/optimized/images`, data, {
//                 headers: {
//                     'Authorization': `Bearer ${adminToken}`,
//                     'Content-Type': 'multipart/form-data'  // Changed this line
//                 }
//             });

//             // return response.data;
//         } catch (error) {
//             if (error.response && error.response.data) {
//                 return rejectWithValue(error.response.data);
//             } else {
//                 return rejectWithValue(error.message);
//             }
//         }
//     }
// );



export const updateCurrentStatus = createAsyncThunk(
    'adminData/updateCurrentStatus',
    async (data, { rejectWithValue }) => {
        const adminToken = JSON.parse(sessionStorage.getItem('adminToken'));
        try {
            const response = await axios.put(`${apiUrl}/api/admin/update/status`, data, {
                headers: {
                    'Authorization': `Bearer ${adminToken}`,
                    'Content-Type': 'application/json'
                }
            })
            return response.data;
        } catch (error) {
            if (error.response && error.response.data) {
                return rejectWithValue(error.response.data);
            } else {
                return rejectWithValue(error.message);
            }
        }
    }
)


export const createCustomOrder = createAsyncThunk(
    'adminData/createCustomOrder',
    async (data, { rejectWithValue }) => {
        const adminToken = JSON.parse(sessionStorage.getItem('adminToken'));
        try {
            const response = await axios.put(`${apiUrl}/api/admin/custom/order/create`, data, {
                headers: {
                    'Authorization': `Bearer ${adminToken}`,
                    'Content-Type': 'application/json'
                }
            })
            return response.data;
        } catch (error) {
            if (error.response && error.response.data) {
                return rejectWithValue(error.response.data);
            } else {
                return rejectWithValue(error.message);
            }
        }
    }
)

// experiment with images



const initialState = {
    resourcesCount: {},
    totalProducts: [],
    orders: {
        totalOrders: [],
        filteredOrders: [],
        curOrderStatusTab: 'total'
    },
    returns: {
        totalReturns: [],
        filteredReturns: [],
        curReturnStatusTab: 'requested'
    },
    // totalOrders: [],
    // curStatusTab: 'total',
    // totalReturns: [],
    totalUsers: [],
    totalUserQueries: [],
    loading: false,
    error: null,
    generatingInvoice: false,
    generatingSaleReport: false,
    // ordersByStatus: {
    //     filteredOrderData: [],
    //     orderStatusTab: "total"
    // },
    // returnsByStatus: {
    //     returnData: [],
    //     returnStatusTab: "requested"
    // },
    otherLoading: {
        updatingOrderStatus: false
    },
    // hasLocalCart: false,
}

const adminData = createSlice({
    name: 'adminData',
    initialState,
    reducers: {
        getOrdersByStatus: (state, action) => {
            let currentOrders = state.orders.totalOrders
            if (action.payload === "total") {
                state.orders.filteredOrders = currentOrders
                state.orders.curOrderStatusTab = action.payload
            } else if (action.payload === "active") {
                currentOrders = state.orders.totalOrders.filter(order => order.orderStatus === action.payload);
                state.orders.filteredOrders = currentOrders
                state.orders.curOrderStatusTab = action.payload
            } else if (action.payload === "completed") {
                currentOrders = state.orders.totalOrders.filter(order => order.orderStatus === action.payload);
                state.orders.filteredOrders = currentOrders
                state.orders.curOrderStatusTab = action.payload
            } else if (action.payload === "cancelled") {
                currentOrders = state.orders.totalOrders.filter(order => order.orderStatus === action.payload);
                state.orders.filteredOrders = currentOrders
                state.orders.curOrderStatusTab = action.payload

            } else if (action.payload === "dispatched") {
                currentOrders = state.orders.totalOrders.filter(order => order.orderStatus === action.payload);
                state.orders.filteredOrders = currentOrders
                state.orders.curOrderStatusTab = action.payload

            } else {
                state.orders.filteredOrders = currentOrders
                state.orders.curOrderStatusTab = action.payload
            }
        },
        getReturnsByStatus: (state, action) => {
            let currentReturns = state.returns.totalReturns
            if (action.payload === "requested") {
                currentReturns = state.returns.totalReturns.filter(curReturn => curReturn.returnStatus === action.payload);
                state.returns.filteredReturns = currentReturns
                state.returns.curReturnStatusTab = action.payload

            }
            else if (action.payload === "rejected") {
                currentReturns = state.returns.totalReturns.filter(curReturn => curReturn.returnStatus === action.payload);
                state.returns.filteredReturns = currentReturns
                state.returns.curReturnStatusTab = action.payload

            } else if (action.payload === "inProgress") {
                currentReturns = state.returns.totalReturns.filter(curReturn => curReturn.returnStatus === action.payload);

                state.returns.filteredReturns = currentReturns
                state.returns.curReturnStatusTab = action.payload

            } else if (action.payload === "completed") {
                currentReturns = state.returns.totalReturns.filter(curReturn => curReturn.returnStatus === action.payload);
                state.returns.filteredReturns = currentReturns
                state.returns.curReturnStatusTab = action.payload

            } else {
                state.returns.filteredReturns = currentReturns
                state.returns.curReturnStatusTab = action.payload

            }
        },
    },
    extraReducers: (builder) => {
        builder
            // get users, orders, etc count
            .addCase(getResourcesCount.pending, (state) => {
                state.loading = true;
                state.error = null
            })
            .addCase(getResourcesCount.fulfilled, (state, action) => {
                state.loading = false,
                    state.resourcesCount = action.payload
            })
            .addCase(getResourcesCount.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload.message
            })
            // get orders, users, etc list 
            .addCase(getList.pending, (state, action) => {
                state.loading = true
                state.error = null
            })
            .addCase(getList.fulfilled, (state, action) => {
                const { type, list } = action.payload
                state.loading = false
                if (type === 'products') {
                    state.totalProducts = list
                }
                if (type === 'orders') {
                    state.orders.totalOrders = list
                    state.orders.filteredOrders = list
                    state.orders.curOrderStatusTab = 'total'
                }
                if (type === 'users') {
                    state.totalUsers = list
                }
                if (type === 'queries') {
                    state.totalUserQueries = list
                }
                if (type === 'returns') {
                    state.returns.totalReturns = list
                    state.returns.filteredReturns = list
                    state.returns.curReturnStatusTab = 'requested'
                }
            })
            .addCase(getList.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            // ========= totla orders ==========
            // .addCase(getTotalOrders.pending, (state) => {
            //     return {
            //         ...state,
            //         loading: true,
            //         error: null,
            //     }
            // })
            // .addCase(getTotalOrders.fulfilled, (state, action) => {
            //     return {
            //         ...state,
            //         loading: false,
            //         totalOrders: action.payload,
            //         ordersByStatus: {
            //             ...state.ordersByStatus,
            //             filteredOrderData: state.totalOrders,
            //             orderStatusTab: action.payload
            //         }

            //     }
            // })
            // .addCase(getTotalOrders.rejected, (state, action) => {
            //     return {
            //         ...state,
            //         loading: false,
            //         error: action.payload,
            //     }
            // })
            // ========= totla users ==========
            // .addCase(getAllUsers.pending, (state) => {
            //     state.loading = true;
            //     state.error = null;
              
            // })
            // .addCase(getAllUsers.fulfilled, (state, action) => {
            //     state.loading = false;
            //     state.totalUsers = action.payload;
               
            // })
            // .addCase(getAllUsers.rejected, (state, action) => {
            //     state.loading = false;
            //     state.error = action.payload
               
            // })
            // ========= totla user queries ==========
            // .addCase(getAllUserQueries.pending, (state) => {
            //     state.loading = true;
            //     state.error = null;
               
            // })
            // .addCase(getAllUserQueries.fulfilled, (state, action) => {
            //     state.loading = false;
            //     state.totalUserQueries = action.payload;
               
            // })
            // .addCase(getAllUserQueries.rejected, (state, action) => {
            //     state.loading = false;
            //     state.error = action.payload;
               
            // })
            // ========= invoice generate ==========
            .addCase(generateInvoice.pending, (state) => {
                state.generatingInvoice = true,
                    state.error = null
            })
            .addCase(generateInvoice.fulfilled, (state, action) => {
                state.generatingInvoice = false
            })
            .addCase(generateInvoice.rejected, (state, action) => {
                state.generatingInvoice = false
                state.error = action.payload
            })
            // generating sales report
            .addCase(generateReport.pending, (state) => {
                state.generatingSaleReport = true;
                state.error = null;
            })
            .addCase(generateReport.fulfilled, (state) => {
                state.generatingSaleReport = false;
            })
            .addCase(generateReport.rejected, (state, action) => {
                state.generatingSaleReport = false;
                state.error = action.payload;
            })

            // ========= totla orders ==========
            // .addCase(getTotalReturns.pending, (state) => {
            //     return {
            //         ...state,
            //         loading: true,
            //         error: null,
            //     }
            // })
            // .addCase(getTotalReturns.fulfilled, (state, action) => {
            //     return {
            //         ...state,
            //         loading: false,
            //         totalReturns: action.payload,
            //         returnsByStatus: {
            //             ...state.returnsByStatus,
            //             returnData: state.totalReturns,
            //             // orderStatusTab: action.payload
            //         }

            //     }
            // })
            // .addCase(getTotalReturns.rejected, (state, action) => {
            //     return {
            //         ...state,
            //         loading: false,
            //         error: action.payload,
            //     }
            // })
            // delete from database
            .addCase(deleteDocumentFromDatabase.pending, (state) => {
                return {
                    ...state,
                    // loading: true,
                    error: null,
                }
            })
            .addCase(deleteDocumentFromDatabase.fulfilled, (state, action) => {
                const { data, collection } = action.payload;
                if (collection === 'Orders') {
                    state.orders.filteredOrders = state.orders.filteredOrders.filter(order => order._id !== data._id)
                    state.orders.totalOrders = state.orders.totalOrders.filter(order => order._id !== data._id)
                } else if (collection === 'Users') {
                    state.totalUsers = state.totalUsers.filter(user => user._id !== data._id)
                } else if (collection === 'Queries') {
                    state.totalUserQueries = state.totalUserQueries.filter(query => query._id !== data._id)
                }
                // return {
                //     ...state,
                //     loading: false,
                // }
            })
            .addCase(deleteDocumentFromDatabase.rejected, (state, action) => {
                return {
                    ...state,
                    // loading: false,
                    error: action.payload,
                }
            })
            // ===== update statussssssssss=================
            .addCase(updateCurrentStatus.pending, (state) => {
                state.otherLoading.updatingOrderStatus = false
                state.error = null
            })
            .addCase(updateCurrentStatus.fulfilled, (state, action) => {
                const { data, collection } = action.payload
                state.otherLoading.updatingOrderStatus = false
                if (collection === 'Orders') {
                    state.ordersByStatus.filteredOrderData = state.ordersByStatus.filteredOrderData.map(order => order._id === data._id ? { ...order, orderStatus: data.orderStatus } : order)

                } else if (collection === 'Payment') {
                    state.ordersByStatus.filteredOrderData = state.ordersByStatus.filteredOrderData.map(order => order._id === data._id ? { ...order, paymentStatus: data.paymentStatus } : order)
                } else if (collection === 'Users') {
                    state.totalUsers = state.totalUsers.map(user => user._id === data._id ? { ...user, role: data.role } : user)
                } else if (collection === 'Returns') {
                    state.returnsByStatus.returnData = state.returnsByStatus.returnData.map(returned => returned._id === data._id ? { ...returned, returnStatus: data.returnStatus } : returned)

                }
            })
            .addCase(updateCurrentStatus.rejected, (state, action) => {
                state.otherLoading.updatingOrderStatus = false
                state.error = action.payload
            })

    }


})

export const { getOrdersByStatus, getReturnsByStatus } = adminData.actions;


export default adminData.reducer;