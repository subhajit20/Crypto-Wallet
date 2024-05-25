'use client'
import React, { useEffect, useState } from 'react'
import { ethers,EtherscanProvider } from 'ethers';
import TxnList from '../list/TxnList';
import { useAppDispatch } from '@/store/hook';
import { getTransaction } from '@/features/userSlice';

type Props = {
    provider:EtherscanProvider,
    address: string
}

const TransactionList = (props: Props) => {
    const { provider,address } = props;
    const [allTransaction, setAllTransactions] = useState<any[]>([]);
    const dispatch = useAppDispatch();

    const getSpecificTransaction = async (hash: string) =>{
        try{
            const trs = await provider.getTransaction(hash);

            if(trs !== null){
                dispatch(
                    getTransaction({
                        trs:trs
                    })
                )
            }else{
                throw new Error('No Trasnsaction')
            }
        }catch(e){
            console.log(e);
        }
    }

    useEffect(()=>{
        async function getAllTransaction(){
            try{
                
                const allTxnList = await provider.fetch('account',
                {
                    action: "txlist",
                    address: address,
                    startblock: 0,
                    endblock:99999999
                },
                false);
                if(allTxnList.length > 0){
                    setAllTransactions([...allTxnList])
                    console.log(allTxnList)
                }
            }catch(e){
                console.log(e)
            }
        }
        getAllTransaction();
    },[provider, address])

    useEffect(()=>{
        async function getTxn(){
            const res = await provider.getTransaction('0xcb51d7f16f785c6f669561d0db2dfe26410f75a4cc793c08f633f9103bd035a1')
            // const data = await res.json();

            console.log(res);
        }

        getTxn();
    },[])
  return ( 
        <div className='pb-3 w-full flex flex-col justify-center items-center gap-y-5'>
            <h1 className='text-2xl text-blue-500 text-left'>TRANSACTIONS</h1>
            {
                allTransaction.length > 0 ? allTransaction.map((txn,i)=>{
                    // console.log(new Date(parseInt(txn.timeStamp)))
                    return <TxnList
                        key={i}
                        to={txn.to!}
                        myAddress={address}
                        value={`${ethers.formatEther(txn.value)}ETH`}
                        timeStamp={txn.timeStamp}
                        hash={txn.hash}
                        getTransaction={() => getSpecificTransaction(txn.hash)}
                    />
                }) : ''
            }
            
        </div>
  )
}

export default TransactionList