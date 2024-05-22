'use client'
import React, { useEffect } from 'react';
import Button from '../ui/buttons/Button';
import MetaMaskLogo from '../ui/metamasklogo/MetaMaskLogo';
import Link from 'next/link';
import { HDNodeWallet } from 'ethers';
import { useRouter } from 'next/navigation';

type Props = {}

const HomePage = (props: Props) => {
  const router = useRouter();


  useEffect(()=>{
    function checkUser(){
        const acc = localStorage.getItem('acc');
        if(acc){
            const account:HDNodeWallet = JSON.parse(acc);
            if(account.mnemonic?.password !== ''){
                router.push('/dashboard');
            }
        }
    }
    checkUser()
},[])
  return (
    <div className='flex flex-col items-center justify-center gap-y-5 w-full'>
        <MetaMaskLogo />
        <Link href={'/importwallet'}><Button btnName={'Import Existing Wallet'} /></Link>
        <Link href={'/createnewwallet'}><Button btnName={'Create New Wallet'} /></Link>
    </div>
  )
}

export default HomePage