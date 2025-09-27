import { NavLink } from 'react-router-dom'; 
import './Nav.css';

export const Nav = () => {
    const handleLogOut = () => {
        localStorage.removeItem('token');
        window.location.reload();
    }
    return (
        <nav>
            <NavLink to="/" end className='navLink'>Home</NavLink>
            <NavLink to="/login" end className='navLink'>LogIn</NavLink>
            <NavLink to="/signup" end className='navLink'>Registration</NavLink>
            <button onClick={handleLogOut} className='navLink'>Выйти</button>
        </nav>
    )
}