import { Routes, Route } from "react-router-dom";
import { Home } from './pages/home';
import { Login } from './pages/login';
import { Registration } from './pages/registration';
import { NotFound } from './pages/not-found';
import { Header } from './components/header'; 
import { io } from "socket.io-client";
import { store } from "./configure-store";
import { messagesApi } from "./store/messages";

export const App = () => {
    const socket = io();
    socket.on('newMessage', (payload) => {
        console.log(payload);
        store.dispatch(messagesApi.util.updateQueryData('getMessages', undefined, (draftMessages) => {
            draftMessages.push(payload)
        }))

    });

    return (
        <>
            <Header />
            <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="*" element={<NotFound />} />
            </Routes>
        </>
    )
}