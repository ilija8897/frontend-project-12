import { Routes, Route } from "react-router-dom";
import { Home } from './pages/home';
import { Login } from './pages/login';
import { Registration } from './pages/registration';
import { NotFound } from './pages/not-found';
import { Header } from './components/header'; 
import { io } from "socket.io-client";

export const App = () => {
    const socket = io();
    socket.on('newMessage', (payload) => {
        console.log(payload); // => { body: "new message", channelId: 7, id: 8, username: "admin" }
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