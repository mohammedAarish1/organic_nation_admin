import axios from 'axios';
import React, { useState, useRef } from 'react';
import { toast } from 'react-toastify';
const apiUrl = import.meta.env.VITE_BACKEND_URL;


const UpdateInvoiceNo = ({ selectedOrder }) => {

    const [invoiceNumber, setInvoiceNumber] = useState(selectedOrder?.invoiceNumber);
    const [isEditing, setIsEditing] = useState(false);
    const inputRef = useRef(null); // Reference to the input field
    const handleCancel = () => {
        setInvoiceNumber(selectedOrder.invoiceNumber); // Reset to the original value
        setIsEditing(false); // Exit editing mode
    };

    const handleEditClick = () => {
        setIsEditing(true);
        setTimeout(() => {
            inputRef.current.focus(); // Focus the input after it renders
        }, 0);
    };

    const handleInputChange = async () => {
        try {
            const adminToken = JSON.parse(sessionStorage.getItem('adminToken'));
            const orderId=selectedOrder._id
            const response = await axios.put(`${apiUrl}/api/admin/update/invoice/number/${orderId}`, {invoiceNumber} , {
                headers: {
                    'Authorization': `Bearer ${adminToken}`,
                }
            });
            if(response.data.success){
                setIsEditing(false)
                toast.success('Updated successfully');
            }
        } catch (error) {
            if(error){
                toast.error(error.response?.data?.error||'Something went wrong')
            }
        }
    }

    return (
        <div className='flex items-center gap-2'>
            <p><strong>Invoice No:</strong>
                {isEditing ? (
                    <input
                        ref={inputRef} // Attach the ref to the input field
                        value={invoiceNumber}
                        onChange={(e) => setInvoiceNumber(e.target.value)}
                        className={`bg-transparent ${isEditing && 'py-1 px-2'}`}
                    />
                ) : (
                    <span> {invoiceNumber}</span>
                )}
            </p>
            {isEditing ? (
                <>
                    <button type='button' onClick={handleInputChange} className='bg-green-500 px-4 py-1 hover:bg-green-600'>Update</button>
                    <button onClick={handleCancel}>Cancel</button>
                </>
            ) : (
                <button onClick={handleEditClick} className='bg-gray-500 text-white rounded-lg py-1 px-4'>Edit</button>
            )}
        </div>
    );
};

export default UpdateInvoiceNo;

