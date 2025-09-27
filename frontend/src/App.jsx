import { Routes, Route } from "react-router-dom";
import { Home } from './pages/home';
import { Login } from './pages/login';
import { Registration } from './pages/registration';
import { NotFound } from './pages/not-found';
import { Header } from './components/header'; 
import { io } from "socket.io-client";
import { store } from "./configure-store";
import { messagesApi } from "./store/messages";
import { channelsApi } from "./store/channels";
import { setActiveChannel } from "./store/app.slice";

export const App = () => {
    const socket = io();
    socket.on('newMessage', (payload) => {
        console.log(payload);
        store.dispatch(messagesApi.util.updateQueryData('getMessages', undefined, (draftMessages) => {
            draftMessages.push(payload)
        }))

    });
    socket.on('newChannel', (payload) => {
        console.log(payload);
        store.dispatch(channelsApi.util.updateQueryData('getChannels', undefined, (draftChannels) => {
            draftChannels.push(payload);
        }))
        store.dispatch(setActiveChannel(payload.id))
    });
    socket.on('removeChannel', (payload) => {
        store.dispatch(channelsApi.util.updateQueryData('getChannels', undefined, (draftChannels) => {
            draftChannels.push(payload);
        }))

        store.dispatch(setActiveChannel('1'))
    });
    socket.on('renameChannel', (payload) => {
        console.log(payload);
        store.dispatch(channelsApi.util.updateQueryData('getChannels', undefined, (draftChannels) => {
            const channel = draftChannels.find(item => item.id === payload.id)
            channel.name = payload.name
        }))
    });

    return (
        <>
            <Header />
            <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Registration />} />
            <Route path="*" element={<NotFound />} />
            </Routes>
        </>
    )
}