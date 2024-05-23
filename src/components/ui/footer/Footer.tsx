import React from 'react';
import Link from 'next/link';

type Props = {}

const Footer = (props: Props) => {
  return (
    <div>
        <div className='navbar bg-violet-950 p-2'>
            <div className="navbar-center w-full">
                <Link href="/"><h3 className='text-base md:tex-lg'>Made by ❤️ Subhajit</h3></Link>
            </div>
        </div>
    </div>
  )
}

export default Footer