import React from 'react'

type Props = {
    infoName:string,
    infoValue:string
}

const TransactionInfoList = (props: Props) => {
  return (
            <div className='flex justify-between'>
                  <span className='font-bold text-gray-400'>{props.infoName}</span>
                  <span>{props.infoValue}</span>
                </div>
  )
}

export default TransactionInfoList