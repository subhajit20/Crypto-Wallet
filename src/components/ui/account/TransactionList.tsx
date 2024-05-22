'use client'
import React, { useEffect, useState } from 'react'
import { ethers,EtherscanProvider } from 'ethers';
import TxnList from '../list/TxnList';

type Props = {
    provider:EtherscanProvider,
    address: string
}

const TransactionList = (props: Props) => {
    const { provider,address } = props;
    const [allTransaction, setAllTransactions] = useState<any[]>([])

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
  return ( 
        <>
            <h1 className='text-2xl text-blue-500 text-left'>Transactions</h1>
            {
                allTransaction.length > 0 ? allTransaction.map((txn,i)=>{
                    // console.log(new Date(parseInt(txn.timeStamp)))
                    return <TxnList
                        key={i}
                        to={txn.to!}
                        myAddress={address}
                        value={`${ethers.formatEther(txn.value)}ETH`}
                        timeStamp={txn.timeStamp}
                    />
                }) : ''
            }
            
        </>
  )
}

export default TransactionList