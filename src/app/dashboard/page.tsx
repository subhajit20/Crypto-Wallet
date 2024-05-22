import React from 'react';
import Dashboard from '@/components/pages/Dashboard';

type Props = {}

const page = (props: Props) => {
  return (
    <div className='bg-white min-h-[35rem] flex justify-center items-center'>
      <Dashboard />
    </div>
  )
}

export default page