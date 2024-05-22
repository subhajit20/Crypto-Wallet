'use client'
import React,{useState} from 'react'
import MatchingPhrase,{ componentName } from './importwallet/MatchingPhrase';
import Steps from '../ui/steps/Steps';

type Props = {}

const ExistingAccountVeify = (props: Props) => {
    const [currntComponent,setCurrentComponent] = useState(0)
    const components = [
        <MatchingPhrase key={0} name={componentName.IMPORTWALLET} steps={currntComponent} prevComponent={setCurrentComponent} />
    ]
  return (
    <div className='bg-white min-h-[42rem]'>
        <Steps />
        {components[currntComponent]}
    </div>
  )
}

export default ExistingAccountVeify