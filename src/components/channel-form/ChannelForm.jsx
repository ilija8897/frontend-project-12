import { modalSelector } from '../../store/app'
import { useSelector } from 'react-redux'
import { DeleteChannelForm } from './DeleteForm'
import { Form } from './Form'

export const ChannelForm = () => {
  const { modalType } = useSelector(modalSelector)

  const formMap = {
    edit: <Form />,
    delete: <DeleteChannelForm />,
    create: <Form />,
  }

  return (
    <>{ formMap[modalType] }</>
  )
}
