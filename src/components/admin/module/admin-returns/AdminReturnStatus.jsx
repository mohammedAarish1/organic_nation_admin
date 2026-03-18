import React from 'react'

const AdminReturnStatus = ({curStatus,handleOnChange}) => {
  return (
    <div className='flex justify-between items-center gap-2' >
    <label htmlFor="">Return Status:</label>
    <select
        value={curStatus}
        onChange={(e) => handleOnChange(e.target.value)}
        className="border rounded p-1"
    >
        <option value="requested">Requested</option>
        <option value="rejected">Rejected</option>
        <option value="inProgress">In Progress</option>
        <option value="completed">Completed</option>
    </select>
</div>
  )
}

export default AdminReturnStatus
