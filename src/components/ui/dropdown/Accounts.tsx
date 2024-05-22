import React from 'react'

type Props = {}

const Accounts = (props: Props) => {
  return (
    <div className="dropdown">
        <label className="btn btn-solid-primary my-2 bg-transparent" tabIndex={0}>Accounts</label>
        <div className="dropdown-menu dropdown-menu-bottom-right shadow-lg">
            <a tabIndex={-1} className="dropdown-item text-sm">Account 1</a>
            <a tabIndex={-1} className="dropdown-item text-sm">Account 2</a>
        </div>
    </div>
  )
}

export default Accounts