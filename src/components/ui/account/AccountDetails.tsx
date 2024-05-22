'use client'
import React,{useEffect, useState} from 'react';
import API_KEY from '../api';
import { HDNodeWallet, ethers, EtherscanProvider
 } from 'ethers';
import AccountAddressCopy from './AccountAddressCopy';
import AccountBalance from './AccountBalance';
import SendEther from './SendEther';
import SendEthModal from '../modal/SendEthModal';
import TransactionList from './TransactionList';
import Spinner from '../icons/Spinner';
import { useRouter } from 'next/navigation';

type Props = {
    address?: string
}

const AccountDetails = (props: Props) => {
    const [fullAddess, setFullAddress] = useState<string | null>();
    const [balance,setBalance] = useState<string | null>();
    const [etherScanPr,setEtherScanPr] = useState<EtherscanProvider>();
    const router = useRouter();

    useEffect(()=>{
        async function getingo() {
            let acc = localStorage.getItem('acc');
            if(acc){
                const account: HDNodeWallet = JSON.parse(acc);
                setFullAddress(account.address)
                try{
                    const provider = new EtherscanProvider(
                            'sepolia',
                            process.env.API_KEY
                        );
                        setEtherScanPr(provider);
                        // const provider = new JsonRpcProvider(
                        //     window.ethereum
                        // );
                    const accBalance: bigint = await provider.getBalance(account.address);
                    // console.log(accBalance < 10)
                    setBalance(ethers.formatEther(accBalance));
                        // const pr = new EtherscanProvider(
                        //     'sepolia',
                        //     API_KEY
                        // );
                        // const data = await pr.fetch(
                        //     'account',
                        //     {
                        //         action: "txlist",
                        //         address: account.address,
                        //         startblock: 0,
                        //         endblock:99999999
                        //     },
                        //     false
                        // )
                        // console.log(data)
                }catch(e){
                    console.log(e)
                }
            }
        }

        getingo()
    },[])

    useEffect(()=>{
        function checkUser(){
            const acc = localStorage.getItem('acc');
            if(acc){
                const account:HDNodeWallet = JSON.parse(acc);
                if(account.mnemonic?.password === ''){
                    router.push('/');
                }
            }
        }
        checkUser()
    },[])
  return (
        <div className='flex flex-col items-center justify-center gap-y-5'>
            {
                fullAddess && balance && etherScanPr ? <>
                    <SendEthModal
                        from={fullAddess!}
                        to=''
                        value={balance}
                        provider={etherScanPr}
                    />
                    <AccountAddressCopy address={fullAddess!} />
                    <AccountBalance balance={balance!} />
                    <SendEther />
                    <TransactionList
                        provider={etherScanPr!}
                        address={fullAddess!}
                    />
            </> : <Spinner />
            }
        </div>
  )
}

export default AccountDetails