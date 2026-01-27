import { NavLink } from 'react-router-dom'
import './Nav.css'
import { useTranslation } from 'react-i18next'

export const Nav = () => {
  const { t } = useTranslation()
  const handleLogOut = () => {
    localStorage.removeItem('token')
    window.location.reload()
  }
  return (
    <nav>
      <NavLink to="/" end className="navLink">{t('nav.Home')}</NavLink>
      <NavLink to="/login" end className="navLink">{t('nav.LogIn')}</NavLink>
      <NavLink to="/signup" end className="navLink">{t('nav.Registration')}</NavLink>
      <button onClick={handleLogOut} className="navLink">{t('nav.logout')}</button>
    </nav>
  )
}
