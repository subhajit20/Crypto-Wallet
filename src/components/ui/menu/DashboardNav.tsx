import React from 'react';
import Networks from '../dropdown/Networks';
import Accounts from '../dropdown/Accounts';

type Props = {}

const DashboardNav = (props: Props) => {
  return (
    <div className="navbar bg-white shadow-md">
        <div className="navbar-start">
            <Networks />
        </div>
        <div className="navbar-center">
            <Accounts />
        </div>
        <div className="navbar-end">
            {/* <a className="navbar-item">Home</a> */}
        </div>
    </div>
  )
}

export default DashboardNav