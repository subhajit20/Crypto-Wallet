'use client'
import React, { useEffect, useState } from 'react'
import { ethers,EtherscanProvider } from 'ethers';
import TxnList from '../list/TxnList';
import { useAppDispatch,useAppSelector } from '@/store/hook';
import { setTransaction } from '@/features/userSlice';
import { selectUser } from '@/features/userSlice';
import { message } from 'antd';
import ShowTransactionDetails from '../modal/ShowTransactionDetails';
import Spinner from '../icons/Spinner';

type Props = {
    provider:EtherscanProvider,
    address: string
}

const TransactionList = (props: Props) => {
    const { provider,address } = props;
    const [allTransaction, setAllTransactions] = useState<any[]>([]);
    const [status, setStatus] = useState<number>()
    const [loader, setLoader] = useState<boolean | null>(null);
    const dispatch = useAppDispatch();
    const [messageApi, contextHolder] = message.useMessage();
    const { transaction } = useAppSelector(selectUser);
    const key = 'updatable';

    const getSpecificTransaction = async (hash: string) =>{
        try{
            const trs = await provider.getTransaction(hash);
            const recipt = await provider.getTransactionReceipt(hash);
            console.log(recipt);

            if(trs !== null && recipt !== null){
                dispatch(
                    setTransaction({
                        trs:trs
                    })
                )
                setStatus(recipt.status || 0);
                messageApi.open({
                    key,
                    type: recipt.status === 1 ? 'success' : 'error',
                    content: `${recipt.status === 1 ? "Confirmed" : "Failed"} Transaction ${trs.hash}`,
                });
            }else{
                throw new Error('No Trasnsaction')
            }
        }catch(e){
            messageApi.open({
                key,
                type: 'error',
                content: `No Trasnsaction`,
            });
        }
    }

    useEffect(()=>{
        async function getAllTransaction(){
            try{
                setLoader(true);
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
                    setLoader(null)
                }
            }catch(e){
                console.log(e)
                setLoader(null);
            }
        }
        getAllTransaction();
    },[provider, address])

  return ( 
        <div className='pb-3 w-full flex flex-col justify-center items-center gap-y-5'>
            {contextHolder}
            <ShowTransactionDetails
                trs={transaction}
                status={status || 0}
            />
            <h1 className='text-2xl text-blue-500 text-left'>TRANSACTIONS</h1>
            {
                loader === true && <Spinner />
            }
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