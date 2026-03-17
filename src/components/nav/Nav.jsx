import { NavLink } from 'react-router-dom'
import './Nav.css'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { userLogOut } from '../../store/auth'
import { isAuthSelector } from '../../selectors/auth.selectors'

export const Nav = () => {
  const { t } = useTranslation()
  const isAuthentificate = useSelector(isAuthSelector)
  const dispatch = useDispatch()

  const handleLogOut = () => {
    dispatch(userLogOut())
    localStorage.removeItem('token')
    window.location.reload()
  }
  return (
    <nav className="nav">
      <NavLink to="/" end className="nav-link">{t('nav.Home')}</NavLink>
      {!isAuthentificate && (
        <>
          <NavLink to="/login" end className="nav-link">{t('nav.LogIn')}</NavLink>
          <NavLink to="/signup" end className="nav-link">{t('nav.Registration')}</NavLink>
        </>
      )}
      {isAuthentificate && <button onClick={handleLogOut} className="btn btn-light nav-link">{t('nav.logout')}</button>}
    </nav>
  )
}
