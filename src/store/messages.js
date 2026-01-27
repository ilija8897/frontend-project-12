import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const messagesApi = createApi({
    reducerPath: 'messages',
    baseQuery: fetchBaseQuery({
        baseUrl: '/api/v1/messages',
        prepareHeaders: (headers) => {

        headers.set('Authorization', `Bearer ${localStorage.getItem('token')}`)

        return headers
        },
    }),
    tagTypes: ['Message'],
    endpoints: builder => ({
        getMessages: builder.query({
        query: () => '',
        providesTags: ['Message']
        }),
        sendMessage: builder.mutation({
        query: message => ({
            method: 'POST',
            body: message,
        }),
        // invalidatesTags: ['Message'],
        }),
        deleteMessage: builder.mutation({
            query: id => ({
                url: id,
                method: 'DELETE',
            }),
        }),
        updateMessage: builder.mutation({
        query: message => ({
            method: 'PATCH',
            body: message,
        }),
        }),
    }),
});

export const {
    useGetMessagesQuery,
    useSendMessageMutation,
    useUpdateMessageMutation,
    useDeleteMessageMutation,
} = messagesApi;
