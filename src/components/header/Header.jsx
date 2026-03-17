import './Header.css'
import { Nav } from '../nav'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export const Header = () => {
  const { t } = useTranslation()
  return (
    <header className="d-flex p-3">
      <h3 className="logo"><Link className="font-monospace text-decoration-none" to="/" end>{t('nav.hexletChat')}</Link></h3>
      <Nav />
    </header>
  )
}
