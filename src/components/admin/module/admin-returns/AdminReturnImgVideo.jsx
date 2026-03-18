import React from 'react'
import AdminReturnItemImages from './AdminReturnItemImages'

const AdminReturnImgVideo = ({curReturn}) => {
  return (
    <div className='flex items-center gap-2'>
    <div>
        <AdminReturnItemImages images={curReturn?.images} />
    </div>
    <div>
        <a href={curReturn?.video} target='_blank' className='px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors '>Show Video</a>
    </div>
</div>
  )
}

export default AdminReturnImgVideo;
