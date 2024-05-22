'use client'
import React,{ useState } from 'react'
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/store/hook';
import { useAppDispatch } from '@/store/hook';
import { selectUser,createAccount, setPassword } from '@/features/userSlice';
import Alert from '../ui/alert/Alert';
import Modal from '../ui/modal/Modal';
import { ethers } from 'ethers';
import MetaMaskLogo from '../ui/metamasklogo/MetaMaskLogo';
import { HDNodeWallet } from 'ethers';

type Props = {
  routename:string
  phrasePage: boolean
}

const SignUp = (props: Props) => {
  const [cofirmPassword,setCofirmPassword] = useState<string | null>(null);
  const [isFormField,setIsFormField] = useState<boolean | null>(null);
  const { wallet,password } = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const router = useRouter();
  
  const CreateWallet = (e:any) =>{
    try{
        if(password !== '' && cofirmPassword === password){
          if(props.phrasePage !== true){
            const acc = localStorage.getItem('acc');
            if(acc){
              const account = JSON.parse(acc);
              if(account.mnemonic?.password === ''){
                account.mnemonic.password = password;
                localStorage.setItem('acc',JSON.stringify(account));
                router.push(props.routename);
              }
            }
          }else{
            const _wallet = ethers.Wallet.createRandom();
            console.log(_wallet);
            // window.alert(_wallet?.address);
            // const data = new Wallet(_wallet.privateKey);
            setIsFormField(true);
            dispatch(
                createAccount({
                  wallet: _wallet
                })
              )
            localStorage.setItem('acc',JSON.stringify(_wallet));
            router.push(props.routename);
          }
        }else{
            setIsFormField(false);
            new Error("Please filled the form correctly!")
        }
    }catch(e){
      setIsFormField(false);
    }finally{
      if(isFormField == false){

        setTimeout(()=>{
          setIsFormField(null);
        },2000)
      }
    }
  }

  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
    dispatch(
      setPassword({
        password:e.target.value
      })
    )
  }

  const goToPhrasePage = () =>{
    router.push(props.routename);
    // router.push('/createnewwallet/verify');
  }
  return (
    <div className="form-field w-2/6 relative -top-20 flex-col gap-y-5">
      {
        isFormField == true && props.phrasePage === true ? <Modal mnemonic={wallet?.mnemonic?.phrase} go={goToPhrasePage}  /> : ''
      }
      {
        isFormField === false ? <Alert okay={isFormField} /> : ''
      }
        <div className='w-full flex justify-center'>
            <MetaMaskLogo />
        </div>
        <div className="form-field">
          <label className="form-label">
            <span className="form-label-alt text-base">New password (8 characters min)</span>
          </label>
		        <input type="password" onChange={(e)=> onPasswordChange(e)}  className="input text-black placeholder:text-black input-lg max-w-full bg-white" placeholder="Enter password" />
        </div>
        <div className="form-field">
          <label className="form-label">
            <span className="form-label-alt text-base">Confirm password</span>
          </label>
		        <input type="password" onChange={(e)=> setCofirmPassword(e.target.value)} className="input text-black placeholder:text-black input-lg max-w-full bg-white" placeholder="Enter password" />
        </div>
        <label className="btn btn-primary" htmlFor="modal-3" onClick={CreateWallet}>Register</label>
	</div>
  )
}

export default SignUp