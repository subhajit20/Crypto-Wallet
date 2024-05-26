import Link from 'next/link'
import React, { useState } from 'react';
import { SendSign } from '../icons/Send';
import TransactionInfoList from '../list/TransactionInfoList';
import { TransactionResponse, ethers } from 'ethers';
import Spinner from '../icons/Spinner';
import { useAppDispatch } from '@/store/hook';
import { clearTransaction } from '@/features/userSlice';
import { useDispatch } from 'react-redux';

type Props = {
  trs:TransactionResponse | null,
  status: number
};

const ShowTransactionDetails = (props: Props) => {
  const {trs,status} = props;
  const dispatch = useDispatch();
  // const [close,setClose] = useState<boolean>();
 
  // const clearTrs = () =>{
  //   setClose(false);
  //   dispatch(
  //     clearTransaction({})
  //   )
  // }
  return (
    <div className='bg-white'>
        <input className="modal-state" id="modal-4" type="checkbox" />
        <div className="modal">
            <label className="modal-overlay"></label>
            {
              trs !== null && <div className="modal-content flex flex-col gap-5 w-full bg-white">
              <label htmlFor="modal-4" className="btn btn-sm btn-circle bg-white text-black absolute right-2 top-2">✕</label>
              <span>Send</span>

              <div className='flex flex-col w-full gap-y-3'>
                <div className='flex justify-between'>
                  <span className='font-bold'>Status</span>
                  <Link href={`https://sepolia.etherscan.io/tx/${trs.hash}`} className='text-blue-500'>view on block explorer</Link>
                </div>
                <div className='flex justify-between'>
                  <span className={`font-bold ${status === 1 ? 'text-green-600' : 'text-red-600'}`}>{status === 1 ? "Confirmed" : "Failed"}</span>
                  {/* <span>To</span> */}
                </div>
                <TransactionInfoList
                  infoName='From'
                  infoValue='To'
                />
                <div className='flex justify-between items-center'>
                  <span className='font-bold'>{
                    `${trs.from.slice(0,5).toLowerCase()}...${trs.from.slice(-4).toLowerCase()}`
                  }</span>
                  <span>
                    <SendSign />
                  </span>
                  <span>{`${trs.to?.slice(0,5).toLowerCase()}...${trs.to?.slice(-4).toLowerCase()}`}</span>
                </div>
                <TransactionInfoList
                  infoName='Transaction'
                  infoValue=''
                />
              </div>
              <div className='flex flex-col w-full gap-y-3'>
                      <TransactionInfoList
                        infoName={'Amount'}
                        infoValue={ethers.formatEther(trs.value).toString()+'sepoliaETH'}
                      />
                    </div>
              <div className='flex flex-col w-full gap-y-3'>
                      <TransactionInfoList
                        infoName={'GasPrice'}
                        infoValue={ethers.formatEther(trs.gasPrice).toString()}
                      />
                    </div>
                    <div className='flex flex-col w-full gap-y-3'>
                      <TransactionInfoList
                        infoName={'GasUsed'}
                        infoValue={ethers.formatEther(trs.gasLimit).toString()}
                      />
                    </div>
            </div>
            }
        </div>
    </div>
  )
}

export default ShowTransactionDetails