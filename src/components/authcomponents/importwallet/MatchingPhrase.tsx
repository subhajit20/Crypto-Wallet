'use client'
import React, { useEffect, useState } from 'react';
import Alert from '../../ui/alert/Alert';
import { useAppSelector } from '@/store/hook';
import { selectUser } from '@/features/userSlice';
import { ethers } from 'ethers';
import { useRouter } from 'next/navigation';

export enum componentName {
    IMPORTWALLET,
    CREATENEWALLET
}

type Props = {
    name:componentName,
    steps?:number,
    prevComponent: React.Dispatch<React.SetStateAction<number>>
}
interface mnemonic_pharase_inputs {
        input1:string,
        input2:string,
        input3:string,
        input4:string,
        input5:string,
        input6:string,
        input7:string,
        input8:string,
        input9:string,
        input10:string,
        input11:string,
        input12:string,
}

const MatchingPhrase = (props: Props) => {
    const router = useRouter()
    const [phrases,setPrases] = useState<mnemonic_pharase_inputs>({
        input1:'',
        input2:'',
        input3:'',
        input4:'',
        input5:'',
        input6:'',
        input7:'',
        input8:'',
        input9:'',
        input10:'',
        input11:'',
        input12:'',
    })
    const [istruePhrase,setIsTruePhrase] = useState<boolean | null>(null);
    const { wallet,password } = useAppSelector(selectUser);

    const onChangeInputs = (e: any ,input: string) =>{
        setPrases((prev: any)=> {
            return { ...prev, [e.target.name]:e.target.value }
        })
    }

    const checkAllInputsFilled = () : string | number => {
        let mnemonic = ''
        
        for(let index in Object.entries(phrases)){
            if(Object.entries(phrases)[parseInt(index)][1] === ""){
                return 0;
            }else{
                if(Object.entries(phrases).length - 1 === parseInt(index) ){
                    mnemonic += Object.entries(phrases)[parseInt(index)][1];
                }else{
                    mnemonic += Object.entries(phrases)[parseInt(index)][1] + ' ';
                }
            }
        }

        return mnemonic;
    } 

    const checkValidPhrase = () =>{
        const res = checkAllInputsFilled();
        
        try{
            if(typeof res !== 'number'){
                const isValid = ethers.Wallet.fromPhrase(res);
                console.log(isValid);
                localStorage.removeItem('acc');
                localStorage.setItem('acc',JSON.stringify(isValid));
                router.push('/importwallet/newpassword');
                setIsTruePhrase(true)
            }
        }catch(e){
            console.log(e);
            setIsTruePhrase(false);
        }finally{   
            setTimeout(()=>{
                setIsTruePhrase(null)
            },2000)
        }
            // console.log(ethers.Wallet.createRandom().mnemonic?.phrase)

    }

    const newWalletMatchingPhrase = () =>{
        try{
            const res = checkAllInputsFilled();
            console.log(typeof res)
            if(typeof res !== 'number' && wallet){
                const wallet_actual_phrase = wallet?.mnemonic?.phrase.split(' ');
                console.log("Inputed - ",res)
                console.log(wallet_actual_phrase)
                for(let i in Object.entries(phrases)){
                    if(Object.entries(phrases)[parseInt(i)][1] !== wallet_actual_phrase![parseInt(i)]){
                        new Error("Phrases are not same!")
                    }
                }

                const acc = localStorage.getItem('acc');
                if(acc){
                    const storedAcc = JSON.parse(acc);
                    if(storedAcc.mnemonic.password === ''){
                        storedAcc.mnemonic.password = password;
                        localStorage.setItem('acc',JSON.stringify(storedAcc));
                        router.push('/dashboard');
                        setIsTruePhrase(true)
                    }
                }
            }else{
                console.log("Error")
                new Error("Please filled all the fields")
            }
        }catch(e){
            console.log(e);
            setIsTruePhrase(false);
        }finally{   
            setTimeout(()=>{
                setIsTruePhrase(null)
            },2000)
        }
    }

    useEffect(()=>{
        // console.log(wallet?.mnemonic?.phrase);
        console.log(phrases)
    },[phrases])

  return (
    <div className='relative top-16'>
        {
            istruePhrase === false ? <Alert okay={istruePhrase} /> : ''
        }
        {
            istruePhrase === true ? <Alert okay={istruePhrase} /> : ''
        }
        <div className='text-2xl md:text-4xl text-center font-extrabold  text-black'>
            <h1>Access your wallet with your</h1>
            <h3>secret recovery phrase</h3>
        </div>
        <div className="form-group relative top-10">
            <div className="form-control relative w-full grid grid-cols-3 gap-10 px-5">
                {
                    Object.entries(phrases).map((inputs,index)=>{
                        return <span key={index} className='flex gap-x-2 justify-center items-center'>
                                    {index+1} <input onChange={(e)=> onChangeInputs(e,inputs[0])} name={inputs[0]} type="password" className="input input-lg max-w-52 bg-white text-black" placeholder="Enter password" />
                                </span>
                    })
                }
            </div>
            <div className='flex justify-center p-4 gap-5'>
                <label className="btn btn-primary self-center rounded-full" htmlFor="modal-3" onClick={()=> props.prevComponent(props.steps! - 1)}>Go Back</label>
                <label className="btn btn-primary self-center rounded-full" htmlFor="modal-3" onClick={props.name == componentName.CREATENEWALLET ? newWalletMatchingPhrase : checkValidPhrase}>
                    Confirm secret recovery phrase
                </label>
            </div>
        </div>
    </div>
  )
}

export default MatchingPhrase