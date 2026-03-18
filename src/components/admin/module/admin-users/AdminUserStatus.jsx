import React from 'react'

const AdminUserStatus = ({role,handleOnChange}) => {
    return (
        <div className='flex justify-between items-center gap-2' >
            <label htmlFor="">User Status:</label>
            <select
                value={role}
                onChange={(e) => handleOnChange(e.target.value)}
                className="border rounded p-1"
            >
                <option value="Customer">Customer</option>
                <option value="Family">Family</option>
                <option value="Friends">Friends</option>
                <option value="Employee">Employee</option>
            </select>
        </div>
    )
}

export default AdminUserStatus;
