import React, { memo } from 'react';
import { Link } from 'react-router-dom';


const Logo = () => {
  return (
    <Link to='/'>
      <div className=''>
        <img
          // src='https://organicnationmages.s3.ap-south-1.amazonaws.com/logo/logo.webp'
          src='https://organicnationmages.s3.ap-south-1.amazonaws.com/logo/ON_Logo.webp'
          alt="logo"
          className='min-w-10 xs:w-16 w-11' />
      </div>
    </Link>
  )
}

export default memo(Logo);
