import { Formik } from 'formik';

import './ChannelForm.css';
import { useAddChannelMutation, useEditChannelMutation, useGetChannelsQuery } from '../../store/channels'; 
import { modalSelector, toggleModal } from '../../store/app.slice'; 
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import filter from 'leo-profanity';


export const ChannelForm = () => {
    const { t } = useTranslation();
    const disatch = useDispatch();
    const { data } = useGetChannelsQuery();
    const { modalType, editedChannel } = useSelector(modalSelector);
    const [ addChannel ] = useAddChannelMutation();
    const [ editChannel ] = useEditChannelMutation();
    const onClose = () => {
        disatch(toggleModal({ isOpen: false }));
    }

    let channelSchema = yup.object().shape({
        name: yup.string().required().min(3, t('modals.channelLengthError')).max(20, t('modals.channelLengthError')).notOneOf(data.map(channel => channel.name)),
    });
    const handleAddChannel = (values) => {
        addChannel({ name: filter.clean(values.name) });
    }
    const handleEditChannel = (values) => {
        editChannel({id: editedChannel.id, name: filter.clean(values.name)});
    }

    const titleMap = {
        edit: t('channels.editChannel'),
        create: t('channels.createChannel'),
    }

    return (
        <div className='channelForm'>
            <h4>{titleMap[modalType]}</h4>
            <Formik
            initialValues={{ name: '' }}
            validationSchema={channelSchema}
            onSubmit={(values, { setSubmitting }) => {
                setSubmitting(false);
                modalType === 'create' && handleAddChannel(values);
                modalType === 'edit' && handleEditChannel(values);
                onClose();
            }}
            >
            {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
            }) => (
                <form onSubmit={handleSubmit}>
                    <label htmlFor="channelName">{t('modals.editChannelName')}</label>
                    <input
                        type="text"
                        name="name"
                        id="channelName"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.name}
                        autoFocus={true}
                        placeholder={t('modals.editChannelName')}
                    />
                    {errors.name && touched.name && errors.name}
                    <button type="submit" disabled={isSubmitting}>
                        {t('modals.sendButton')}
                    </button>
                    <button type="submit" onClick={onClose}>
                        {t('modals.cancel')}
                    </button>
                </form>
            )}
            </Formik>
        </div>
    )
    
}