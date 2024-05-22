import React from 'react'

type Props = {
    btnName:string,
    func?:() => void
}

const Button = (props: Props) => {
  return (
    <button onClick={props.func} className="btn btn-outline-primary rounded-full btn-md">
        {props.btnName}
    </button>
  )
}

export default Button