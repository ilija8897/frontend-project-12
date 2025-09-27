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
    tagTypes: ['Channel', 'Message'],
    endpoints: (build) => ({
        getChannels: build.query({
            query: () => '/channels',
            providesTags: ['Channel']
        }),
        addChannel: build.mutation({
            query: channel => ({
            url: '/channels',
            method: 'POST',
            body: channel,
            }),
        }),
        editChannel: build.mutation({
            query: ({id, name}) => ({
            url: `/channels/${id}`,
            method: 'PATCH',
            body: {name: name}
            }),
        }),
        deleteChannel: build.mutation({
            query: ({ id }) => ({
            url: `/channels/${id}`,
            method: 'DELETE',
            }),
            invalidatesTags: ['Channel', 'Message']
        }),
    })
});

export const { useGetChannelsQuery, useAddChannelMutation, useEditChannelMutation, useDeleteChannelMutation } = channelsApi;