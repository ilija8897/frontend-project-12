import { NavLink } from 'react-router-dom'; 
import './Nav.css';

export const Nav = () => {
    return (
        <nav>
            <NavLink to="/" end className='navLink'>Home</NavLink>
            <NavLink to="/login" end className='navLink'>LogIn</NavLink>
            <NavLink to="/registration" end className='navLink'>Registration</NavLink>
        </nav>
    )
}