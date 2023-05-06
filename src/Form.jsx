import { useState } from 'react'
import { useCreateTask } from './customhooks'
const Form = () => {
  const [newItemName, setNewItemName] = useState('')
  const { isLoading, createTask } = useCreateTask()
  const handleSubmit = (e) => {
    e.preventDefault()
    createTask(newItemName, {
      onSuccess: () => {
        setNewItemName('')
      },
    })
  }
  return (
    <form onSubmit={handleSubmit}>
      <h4>to do list</h4>
      <div className='form-control'>
        <input
          type='text '
          className='form-input'
          value={newItemName}
          onChange={(event) => setNewItemName(event.target.value)}
        />
        <button type='submit' className='btn' disabled={isLoading}>
          add task
        </button>
      </div>
    </form>
  )
}
export default Form
