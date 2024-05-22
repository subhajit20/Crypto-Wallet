'use client'
import React, { useEffect } from 'react'
import { useAppSelector } from '@/store/hook';
import { selectUser } from '@/features/userSlice';

type Props = {}

const PhraseMatch = (props: Props) => {
  const {wallet} = useAppSelector(selectUser);

  useEffect(()=>{
    if(wallet?.mnemonic?.phrase){
      console.log(wallet?.mnemonic?.phrase)
    }
  },[wallet?.mnemonic?.phrase])
  return (
    <div>
        <h1>Matching Phrase</h1>
    </div>
  )
}

export default PhraseMatch