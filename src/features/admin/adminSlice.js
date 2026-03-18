import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const apiUrl = import.meta.env.VITE_BACKEND_URL;

// thunk for signing up 
// export const adminLogin = createAsyncThunk(
//     'admin/adminLogin',
//     async (data, { rejectWithValue }) => {
//         try {
//             const response = await axios.post(`${apiUrl}/api/admin/login`, data);

//             if (response.status === 200) {
//                 // let csrfToken = response.data.csrfToken;
//                 const adminProfile = await axios.get(`${apiUrl}/api/admin/profile`, {
//                     headers: {
//                         'Authorization': `Bearer ${response.data.token}`,
//                         'Content-Type': 'application/json'
//                     }
//                 })

//             }
//         } catch (error) {
//             return rejectWithValue(error.response.data)
//         }
//     }
// );


export const adminLogin = createAsyncThunk(
    'admin/adminLogin',
    async (data, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${apiUrl}/api/admin/login`, data);

            if (response.status === 200) {
                return response.data;
            }
            return response.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
);

export const fetchAdminData = createAsyncThunk(
    'admin/fetchAdminDetails',
    async (token, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${apiUrl}/api/admin/profile`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            })

            return response.data;
        } catch (error) {

        }
    }
)


const initialState = {
    admin: '',
    isAdminLoggedIn: false,
    token: '',
    loading: false,
    error: null,
    // hasLocalCart: false,
}

const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        adminLogout(state) {

            sessionStorage.removeItem('adminToken')

            return {
                ...state,
                admin: '',
                isAdminLoggedIn: false,
                token: '',
                loading: false,
            }
        },

    },
    extraReducers: (builder) => {
        builder
            // ========= loggin in ==========
            .addCase(adminLogin.pending, (state) => {
                return {
                    ...state,
                    loading: true,
                    error: null,
                }
            })
            .addCase(adminLogin.fulfilled, (state, action) => {
                return {
                    ...state,
                    loading: false,
                    isAdminLoggedIn: true,
                    token: action.payload.token

                }
            })
            .addCase(adminLogin.rejected, (state, action) => {
                return {
                    ...state,
                    loading: false,
                    error: action.payload,
                }
            })
            // ========= admin data ==========
            .addCase(fetchAdminData.pending, (state) => {
                return {
                    ...state,
                    loading: true,
                    error: null,
                }
            })
            .addCase(fetchAdminData.fulfilled, (state, action) => {
                return {
                    ...state,
                    admin: action.payload,
                    loading: false,
                    isAdminLoggedIn: true,

                }
            })
            .addCase(fetchAdminData.rejected, (state, action) => {
                return {
                    ...state,
                    loading: false,
                    error: action.payload,
                }
            })


    }


})

export const { adminLogout } = adminSlice.actions;

export default adminSlice.reducer;