'use client'
import React,{useState} from 'react'
import Steps from '@/components/ui/steps/Steps';
import MatchingPhrase ,{ componentName } from './importwallet/MatchingPhrase';
import SeedPhrase from './importwallet/SeedPhrase';

type Props = {}

const NewAccountVerify = (props: Props) => {
    const [currntComponent,setCurrentComponent] = useState(0)
    const components = [
        <SeedPhrase key={0} steps={currntComponent} nextComponent={setCurrentComponent} />,
        <MatchingPhrase key={1} name={componentName.CREATENEWALLET} steps={currntComponent} prevComponent={setCurrentComponent} />
    ]
  return (
    <div className='bg-white min-h-[42rem]'>
        <Steps />
        {components[currntComponent]}
    </div>
  )
}

export default NewAccountVerify