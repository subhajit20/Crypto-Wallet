import React from 'react';
import Send,{Get} from '../icons/Send';
import { ethers } from 'ethers';

type Props = {
  myAddress: string,
  to: string,
  value: string,
  timeStamp: string
}

const TxnList = (props: Props) => {
  return (
    <div className='cursor-pointer flex py-3 px-2 rounded-full justify-between items-center w-[20rem] md:w-[30rem] bg-slate-200 '>
        <div className='justify-self-start'>
            {
              props.to.toLowerCase() === props.myAddress.toLowerCase() ? <Get /> : <Send />
            }
        </div>
        <div className='flex flex-col bg-full justify-self-start'>
            <span className='text-black'>
              {
                props.to.toLowerCase() === props.myAddress.toLowerCase() ? 'Get' : 'Send'
              }
            </span>
            <span>
              {new Date(parseInt(props.timeStamp)).toDateString()}
            </span>
        </div>
        <div className='justify-self-end text-black self-start text-xl' >
            {
              props.value
            }
        </div>
    </div>
  )
}

export default TxnList