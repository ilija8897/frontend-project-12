import './Header.css';
import { Nav } from '../../components/nav';
import { Link } from 'react-router-dom';

export const Header = () => {
  return (
      <header>
        <h3 className='logo'><Link to={'/'} end>Hexlet Chat</Link></h3>
        <Nav />
      </header>
  )
}

