import React from 'react'
import FormComponent from './components/FormComponent'

function App() {
  return (
    <div className='flex flex-col items-center justify-center bg-neutral-700 h-screen'>
      <h1 className='text-3xl text-green-400'>Register form</h1>
      <FormComponent />
    </div>
  )
}

export default App