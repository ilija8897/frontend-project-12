import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const channelsApi = createApi({
    reducerPath: 'channels',
    baseQuery: fetchBaseQuery({
        baseUrl: '/api/v1',

        prepareHeaders: (headers) => {

        headers.set('Authorization', `Bearer ${localStorage.getItem('token')}`)

        return headers
        },
    }),
    endpoints: (build) => ({
        getChannels: build.query({
            query: () => '/channels'
        })
    })
});

export const { useGetChannelsQuery } = channelsApi;