import { Spinner } from '@nextui-org/react'
import React from 'react'

export const LoadingSpinner = () => {
  return (
    <div className='w-[80vw] m-auto h-[80vh] flex items-center justify-center'>
        <Spinner size="lg" label='Loading...' />
    </div>

  )
}
