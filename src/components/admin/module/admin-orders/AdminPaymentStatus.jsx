import React from 'react'

const AdminPaymentStatus = ({curStatus,handleOnChange}) => {
    return (
        <div className='flex justify-between items-center gap-2'>
            <label htmlFor="">Payment Status:</label>
            <select
                value={curStatus}
                onChange={(e) => handleOnChange(e.target.value)}
                className="border rounded p-1"
            >
                <option value="PAID">PAID</option>
                <option value="PENDING">PENDING</option>

            </select>
        </div>
    )
}

export default AdminPaymentStatus
