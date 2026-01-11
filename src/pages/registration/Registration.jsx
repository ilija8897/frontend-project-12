import './Registration.css'
import { RegistrationForm } from '../../components/reg-form';
import { useTranslation } from 'react-i18next';

export const Registration = () => {
    const { t } = useTranslation();
    return (
        <>
        <h3>{t('signup.header')}</h3>
        <RegistrationForm />
        </>

    )
}
