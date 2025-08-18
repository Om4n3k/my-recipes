import React from 'react'
import NewRecipeForm from './NewRecipeForm'

const NewRecipePage = () => {
  return (
    <>
      <h2 className='border-r-4 border-rose-600 font-bold text-2xl'>
        <span className='text-rose-600'>Create</span> a new recipe
      </h2>
      <NewRecipeForm />
    </>
  )
}

export default NewRecipePage