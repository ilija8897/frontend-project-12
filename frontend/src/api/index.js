import axios from 'axios';
import { createApi } from '@reduxjs/toolkit/query/react'

const baseUrl = '/api/v1';
export const apiConfig = {
    baseUrl: '/',
    headers: {
    }
}

export const axiosInstance = axios.create({
    timeout: 30000,
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
})

// export const authApi = createApi({
//     baseQuery: fetchBaseQuery({
//         baseUrl,
//     })
// })