import './Header.css'
import { Nav } from '../nav'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export const Header = () => {
  const { t } = useTranslation()
  return (
    <header>
      <h3 className="logo"><Link to="/" end>{t('nav.hexletChat')}</Link></h3>
      <Nav />
    </header>
  )
}
