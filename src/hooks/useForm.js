import { useState } from 'react'

export function useForm({ initialForm }) {
  const [formValues, setFormValues] = useState(initialForm)

  const onSubmit = (e, handleSubmit) => {
    e.preventDefault()
    // uncontrolled
    // const fields = new FormData(e.target)
    // const query = fields.get('query')

    handleSubmit(formValues)
  }

  const handleChange = (e) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [e.target.name]: e.target.value
    }))
  }

  const resetForm = () => {
    setFormValues(() => initialForm)
  }

  return { handleChange, onSubmit, formValues, resetForm }
}
