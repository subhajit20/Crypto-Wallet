import React from 'react';
import MetaMask from '../../../../public/assets/MetaMask_Fox.png';
import Image from 'next/image';

type Props = {}

const MetaMaskLogo = (props: Props) => {
  return (
    <div>
        <Image height={200} width={200} alt='' src={MetaMask} />
    </div>
  )
}

export default MetaMaskLogo