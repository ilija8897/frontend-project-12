import axios from 'axios';

export const axiosInstance = axios.create({
    timeout: 30000,
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
})
