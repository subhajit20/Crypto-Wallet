import React from 'react'

type Props = {
    balance?: string
}

const AccountBalance = (props: Props) => {

  return (
    <div>
        <h1 className='text-xl md:text-3xl text-center text-black'>{props.balance}SepoliaETH</h1>
    </div>
  )
}

type AccountBalanceInUSDProps = {
    balanceInUSD?: string
}

const AccountBalanceInUSD = (props: AccountBalanceInUSDProps) => {

    return (
      <div>
          <h1 className='text-lg md:text-6xl text-center text-black'>{props.balanceInUSD}ETH</h1>
      </div>
    )
  }

export default AccountBalance