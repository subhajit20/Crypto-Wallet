'use client'
import React from 'react';
import { useAppSelector } from '@/store/hook';
import { selectUser } from '@/features/userSlice';

type Props = {
  steps?:number,
  nextComponent: React.Dispatch<React.SetStateAction<number>>
}

const SeedPhrase = (props: Props) => {
    const { wallet } = useAppSelector(selectUser);

  return (
    <div className=''>
        <div className='flex justify-center relative top-16'>
          <div className=''>
            {
              wallet?.mnemonic?.phrase ? wallet?.mnemonic?.phrase.split(' ').slice(0,6).map((p,i)=>{
                return <div key={i} className='p-2 text-black flex justify-center items-center gap-x-4 '>
                        {i+1}<span className="badge badge-outline-primary text-base">{p}</span><br/>
                      </div>
              }) : ''
            }
          </div>
          <div className=''>
            {
              wallet?.mnemonic?.phrase ? wallet?.mnemonic?.phrase.split(' ').slice(6,13).map((p,i)=>{
                return <div key={i} className='p-2 text-black flex justify-center items-center gap-x-4 '>
                        {i+1}<span className="badge badge-outline-primary text-base">{p}</span><br/>
                      </div>
              }) : ''
            }
          </div>
        </div>
        <div className='flex justify-center'>
          <button onClick={()=> props.nextComponent(props.steps!+1)} className="btn btn-outline-primary w-20 self-center relative top-20">Next</button>
        </div>
    </div>
  )
}

export default SeedPhrase

