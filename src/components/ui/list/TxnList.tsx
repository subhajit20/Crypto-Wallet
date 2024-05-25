import React from 'react';
import Send,{Get, DumbSend} from '../icons/Send';
import { ethers } from 'ethers';

type Props = {
  myAddress: string,
  to: string,
  value: string,
  timeStamp: string,
  hash: string,
  getTransaction: ()=> void
}

const TxnList = (props: Props) => {
  const getTransaction = () =>{
    console.log("Okk")
  }
  return (
    <label onClick={props.getTransaction} htmlFor="modal-4" className='cursor-pointer flex py-3 px-2 rounded-full justify-between items-center w-[20rem] md:w-[30rem] bg-slate-200 '>
      {/* <label htmlFor="modal-3"></label> */}
        <div className='justify-self-start'>
            {
              props.to.toLowerCase() === props.myAddress.toLowerCase() ? <Get /> : <DumbSend />
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
    </label>
  )
}

export default TxnList