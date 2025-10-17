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
import { ToastContainer, toast } from 'react-toastify';
import { Provider, ErrorBoundary } from '@rollbar/react';

export const App = () => {
    const socket = io();
    socket.on('newMessage', (payload) => {
        store.dispatch(messagesApi.util.updateQueryData('getMessages', undefined, (draftMessages) => {
            draftMessages.push(payload)
        }))

    });
    socket.on('newChannel', (payload) => {
        toast("Канал создан");
        store.dispatch(channelsApi.util.updateQueryData('getChannels', undefined, (draftChannels) => {
            draftChannels.push(payload);
        }))
        store.dispatch(setActiveChannel(payload.id))
    });
    socket.on('removeChannel', (payload) => {
        toast("Канал удален");
        store.dispatch(channelsApi.util.updateQueryData('getChannels', undefined, (draftChannels) => {
            draftChannels.push(payload);
        }))

        store.dispatch(setActiveChannel('1'))
    });
    socket.on('renameChannel', (payload) => {
        toast("Канал переименован");
        store.dispatch(channelsApi.util.updateQueryData('getChannels', undefined, (draftChannels) => {
            const channel = draftChannels.find(item => item.id === payload.id)
            channel.name = payload.name
        }))
    });

    const rollbarConfig = {
        accessToken: '9eeb59c07ca24f1b8580ae6c6668e57c',
        captureUncaught: true,
        captureUnhandledRejections: true,
        environment: 'testenv',
    };

    return (
        <Provider config={rollbarConfig}>
            <ErrorBoundary>
                <Header />
                <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Registration />} />
                <Route path="*" element={<NotFound />} />
                </Routes>
                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick={false}
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                />
            </ErrorBoundary>
        </Provider>
    )
}