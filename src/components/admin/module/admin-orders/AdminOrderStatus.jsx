import React from 'react'

const AdminOrderStatus = ({curStatus,handleOnChange}) => {
  return (
    <div className='flex justify-between items-center gap-2' >
    <label htmlFor="">Order Status:</label>
    <select
        value={curStatus}
        onChange={(e) => handleOnChange(e.target.value)}
        className="border rounded p-1"
    >
        <option value="active">Active</option>
        <option value="dispatched">Dispatched</option>
        <option value="completed">Completed</option>
        <option value="cancelled">Cancelled</option>
    </select>
</div>
  ) 
}

export default AdminOrderStatus;
