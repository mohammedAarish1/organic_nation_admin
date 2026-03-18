import React, { useEffect, useRef, useState } from 'react'

const AdminReturnDetails = ({curReturn}) => {
    const modalRef = useRef();
    const [selectedReturn, setSelectedReturn] = useState(null);


     const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                setSelectedReturn(null);
            }
        };
    
        useEffect(() => {
            document.addEventListener('mousedown', handleClickOutside);
    
    
            return () => {
                document.removeEventListener('mousedown', handleClickOutside);
            };
        }, []);

    return (
        <>
            <button
                onClick={() => setSelectedReturn(curReturn)}
                className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-800"
            >
                Return Details
            </button>
            {selectedReturn && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div ref={modalRef} className="bg-white p-6 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <h2 className="text-2xl font-bold mb-4">Return Details</h2>
                        <p><strong>Reason of Return:</strong> {selectedReturn.reason}</p>
                        <p><strong>Invoice No:</strong> {selectedReturn.invoiceNumber}</p>
                        <p><strong>Item Name:</strong> {selectedReturn.itemName}</p>
                        <p><strong>Weight:</strong> {selectedReturn.weight}</p>
                        <p><strong>Quantity:</strong> {selectedReturn.quantity}</p>
                        <p><strong>Requested For:</strong> {selectedReturn.returnOptions}</p>
                        <p><strong>Return Status:</strong> {selectedReturn.returnStatus}</p>
                    </div>
                </div>
            )}
        </>
    )
}

export default AdminReturnDetails
