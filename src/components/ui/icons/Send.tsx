import React from 'react'

type Props = {
}

const Send = (props: Props) => {
  return (
    <label htmlFor="modal-3">

        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-11 h-11 bg-blue-600 text-white p-2 rounded-full cursor-pointer btn btn-primary">
            <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
        </svg>
    </label>

  )
}

export const Get = (props: Props) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-11 h-11 bg-blue-600 text-white p-2 rounded-full cursor-pointer btn btn-primary">
      <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 4.5-15 15m0 0h11.25m-11.25 0V8.25" />
    </svg>

  )
}



export default Send