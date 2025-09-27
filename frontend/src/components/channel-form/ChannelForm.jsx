import { Formik } from 'formik';

import './ChannelForm.css';
import { useAddChannelMutation, useEditChannelMutation, useGetChannelsQuery } from '../../store/channels'; 
import { modalSelector, toggleModal } from '../../store/app.slice'; 
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';


export const ChannelForm = () => {
    const disatch = useDispatch();
    const { data } = useGetChannelsQuery();
    const { modalType, editedChannel } = useSelector(modalSelector);
    const [ addChannel ] = useAddChannelMutation();
    const [ editChannel ] = useEditChannelMutation();
    const onClose = () => {
        disatch(toggleModal({ isOpen: false }));
    }

    let channelSchema = yup.object().shape({
        name: yup.string().required().min(3).max(20).notOneOf(data.map(channel => channel.name)),
    });
    const handleAddChannel = (values) => {
        addChannel({ name: values.name });
    }
    const handleEditChannel = (values) => {
        editChannel({id: editedChannel.id, name: values.name});
    }

    const titleMap = {
        edit: 'Edit Channel',
        create: 'Create new channel',
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
                    <input
                        type="text"
                        name="name"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.name}
                        autoFocus={true}
                    />
                    {errors.name && touched.name && errors.name}
                    <button type="submit" disabled={isSubmitting}>
                        Create
                    </button>
                    <button type="submit" onClick={onClose}>
                        Cancel
                    </button>
                </form>
            )}
            </Formik>
        </div>
    )
    
}