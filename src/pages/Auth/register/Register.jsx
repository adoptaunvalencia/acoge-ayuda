import { useContext, useState } from 'react'
import { ReducerContext } from '../../../contexts/reducer.contexts/ReducerContext'
import { registerUser } from '../../../reducers/auth.reducer/auth.action'
import Form from '../../../components/form-group/Form'
import './Register.css'

const Register = () => {
  const [responseMessage, setResponseMessage] = useState('')
  const {
    stateLoad: { load },
    dispatchLoad
  } = useContext(ReducerContext)

  const fields = [
    { name: 'name', label: 'Nombre', type: 'text', required: true },
    { name: 'lastname', label: 'Apellido', type: 'text', required: true },
    { name: 'phone', label: 'Teléfono', type: 'tel', required: true },
    {
      name: 'email',
      label: 'Correo Electrónico',
      type: 'email',
      required: true,
      validate: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
    },
    {
      name: 'birthDate',
      label: 'Fecha de Nacimiento',
      type: 'date',
      required: true
    },
    { name: 'city', label: 'Ciudad', type: 'text', required: true },
    { name: 'address', label: 'Dirección', type: 'text', required: true },
    {
      name: 'postalcode',
      label: 'Código Postal',
      type: 'text',
      required: true
    },
    { name: 'password', label: 'Contraseña', type: 'password', required: true }
  ]

  const handleFormSubmit = async (formData) => {
    const data = await registerUser(formData, dispatchLoad)
    console.log(data)
  }

  return (
    <div className='register-form'>
      <h2>Registro de Usuario</h2>
      <Form
        fields={fields}
        onSubmit={handleFormSubmit}
        buttonText='Registrarse'
      />
      {responseMessage && <p className='response-message'>{responseMessage}</p>}
    </div>
  )
}

export default Register
