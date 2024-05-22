import React from 'react'

type Props = {}

const Networks = (props: Props) => {
  return (
    <div className="dropdown">
        <label className="btn btn-solid-primary my-2 bg-transparent" tabIndex={0}>Click</label>
        <div className="dropdown-menu dropdown-menu-bottom-right shadow-lg">
            <a className="dropdown-item text-sm">Profile</a>
            <a tabIndex={-1} className="dropdown-item text-sm">Account settings</a>
            <a tabIndex={-1} className="dropdown-item text-sm">Subscriptions</a>
        </div>
    </div>
  )
}

export default Networks