import React from 'react'

type Props = {}

function Steps({}: Props) {
  return (
    <div className='max-w-full flex justify-center items-center relative top-5'>
        <ol className="steps w-5/6 md:w-2/6 text-black">
            <li className="step step-primary step-done overflow-hidden">
                <div className="step-circle">1</div>
                <h3 className='text-xs md:text-lg'>Showing Phrase</h3>
            </li>
            <li className="step step-primary step-active overflow-hidden">
                <div className="step-circle">3</div>
                <h3 className='text-xs md:text-lg'>Matching Phrase</h3>
            </li>
        </ol>
    </div>
  )
}

export default Steps