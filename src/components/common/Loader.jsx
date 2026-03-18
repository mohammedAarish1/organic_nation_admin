import React from 'react'

const Loader = ({height}) => {
    return (
        <div className={`w-full h-[${height}] flex justify-center items-center`}>
            <div className="loader"></div>
        </div>
    )
}

export default Loader;
