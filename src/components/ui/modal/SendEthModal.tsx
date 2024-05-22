'use client'
import React, { useState } from 'react';
import { Wallet } from 'ethers';
import { EtherscanProvider } from 'ethers';
import { HDNodeWallet } from 'ethers';
import TransactionMessage from '../message/TransactionMessage';

type Props = {
    from: string,
    to: string,
    value: string,
    provider:EtherscanProvider
}

const SendEthModal = (props: Props) => {
    const [wei, setWei] = useState<string>();
    const [err, setErr] = useState<string>();
    const [toAddress,setToAddress] = useState<string>('');
    const { from, to, value, provider } = props;

    const onWeiChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
        console.log(parseFloat(props.value))
        console.log(parseFloat(e.target.value))
        console.log(parseFloat(props.value) < parseFloat(e.target.value))
        try{
            if(parseFloat(props.value) < parseFloat(e.target.value)){
                throw new Error("Insufficent Ether");
            }else{
                setWei(wei!);
            }
        }catch(e){
            console.log(e)
            setErr("Insufficent Ether");
        }finally{
            setTimeout(()=>{
                setErr('')
            },3000)
        }
    }

    const SendEther = async () =>{
        console.log("Sending")
        try{
            console.log("Checking account")
            const acc = localStorage.getItem('acc');
            if(acc && toAddress !== ''){
                const account:HDNodeWallet = JSON.parse(acc);
                console.log(account)
                const privateKey = Wallet.fromPhrase(account.mnemonic?.phrase!)
                const wallet = new Wallet(
                    privateKey.privateKey,
                    provider
                )
                const tx = {
                    to: to!,
                    value: wei,
                };
                console.log("Creating tx")
                const txRes = await wallet.sendTransaction(tx);

                console.log("Sent")
                console.log(txRes)
            }else{
                console.log(toAddress)
                console.log(acc)
                console.log(parseFloat(wei!) <  parseFloat(value))
            }
        }catch(e){
            console.log(e)
        }finally{
                    
        }
    }
  return (
    <div>
        <input className="modal-state" id="modal-3" type="checkbox" />
        <div className="modal">
            <label className="modal-overlay"></label>
            <div className="modal-content flex flex-col gap-5 w-full">
                <label htmlFor="modal-3" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</label>
                <div className="form-field w-full">
                    <label className="form-label text-xl">From</label>
                    <input placeholder="Type here" value={props.from} type="email" className="input max-w-full text-lg" />
                </div>

                <div className="form-field w-full">
                    <label className="form-label text-xl">To</label>

                    <input placeholder="Type here" onChange={(e)=> setToAddress(e.target.value)} type="email" className="input max-w-full text-lg" />
                </div>

                <div className="form-field w-full">
                    <label className="form-label text-xl">Balance - {props.value}ETH</label>
                    <label className='form-label text-base text-red-500'>{err}</label>
                    <input placeholder="Type here" onChange={(e)=> onWeiChange(e)} type="number" className="input max-w-full text-lg" />
                </div>
            
                <div className="flex gap-3">
                    <TransactionMessage 
                        toAddress={toAddress}
                        provider={provider}
                        wei={wei!}
                    />
                </div>
            </div>
        </div>
    </div>
  )
}

export default SendEthModal