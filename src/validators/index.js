import * as yup from 'yup'

const userValidation = t => yup.string().required(t('signup.required')).min(3, t('signup.nameLengthError')).max(20, t('signup.nameLengthError'))
const passValidation = t => yup.string().required(t('signup.required')).min(6, t('signup.lengthError'))
const repeatPassValidation = t => yup.string().test('repeatPassword', t('signup.notMatch'), (value, context) => value === context.parent.password)

export const registrationSchema = t => yup.object().shape({
  username: userValidation(t),
  password: passValidation(t),
  repeatPassword: repeatPassValidation(t),
})

export const messageSchema = yup.object().shape({
  message: yup
    .string()
    .required(),
})

export const getChannelSchema = (data, t) => (
  yup.object().shape({
    name: yup.string().required().min(3, t('modals.channelLengthError')).max(20, t('modals.channelLengthError')).notOneOf(data.map(channel => channel.name)),
  })
)
