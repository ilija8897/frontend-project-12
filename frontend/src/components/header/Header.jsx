import './Header.css';
import { Nav } from '../../components/nav';

export const Header = () => {
  return (
      <header>
        <h3 className='logo'>{'/-/exlet <chat>'}</h3>
        <Nav />
      </header>
  )
}

