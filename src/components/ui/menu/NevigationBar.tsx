import React, { useState } from 'react'
import Image from 'next/image'
import MetaMask from '../../../../public/assets/MetaMask_Fox.png';
import { ethers } from 'ethers';
import Link from 'next/link';

type Props = {}

const NevigationBar = (props: Props) => {
  return (
    <div className="navbar bg-violet-950">
        <div className="navbar-start">
          <Image height={50} width={50} alt='' src={MetaMask} />
          <Link href="/"><h3>METAMASK Clone</h3></Link>
        </div>
        <div className="navbar-end">
            <a className="navbar-item">Home</a>
        </div>
    </div>
  )
}

export default NevigationBar