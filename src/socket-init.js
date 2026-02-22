import { store } from './configure-store'
import { messagesApi } from './store/messages'
import { channelsApi } from './store/channels'
import { toast } from 'react-toastify'
import { setActiveChannel } from './store/app.slice'

export const socketInit = (socket, t) => {
  socket.on('newMessage', (payload) => {
    store.dispatch(messagesApi.util.updateQueryData('getMessages', undefined, (draftMessages) => {
      draftMessages.push(payload)
    }))
  })

  socket.on('newChannel', (payload) => {
    toast(t('notifications.channelCreated'))
    store.dispatch(channelsApi.util.updateQueryData('getChannels', undefined, (draftChannels) => {
      draftChannels.push(payload)
    }))
  })

  socket.on('removeChannel', (payload) => {
    toast(t('notifications.channelDeleted'))
    store.dispatch(channelsApi.util.updateQueryData('getChannels', undefined, (draftChannels) => {
      draftChannels.push(payload)
    }))
    store.dispatch(setActiveChannel('1'))
  })

  socket.on('renameChannel', (payload) => {
    toast(t('notifications.channelRenamed'))
    store.dispatch(channelsApi.util.updateQueryData('getChannels', undefined, (draftChannels) => {
      const channel = draftChannels.find(item => item.id === payload.id)
      channel.name = payload.name
    }))
  })
}
