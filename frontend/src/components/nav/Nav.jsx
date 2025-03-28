import { NavLink } from 'react-router-dom'; 
import './Nav.css';

export const Nav = () => {
    return (
        <nav>
            <NavLink to="/" end className='navLink'>Home</NavLink>
            <NavLink to="/login" end className='navLink'>login</NavLink>
        </nav>
    )
}