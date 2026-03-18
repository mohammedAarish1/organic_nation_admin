import  { useEffect, useRef, useState } from 'react'
import UpdateInvoiceNo from '../../UpdateInvoiceNo'
import { address } from '../../../../helper/helperFunctions';
import { useDispatch, useSelector } from 'react-redux';
import { generateInvoice } from '../../../../features/admin/adminData';
import { Loader } from 'lucide-react';
import SubmitButton from '../../../../components/button/SubmitButton'
const AdminOrderDetails = ({ order }) => {

    const dispatch = useDispatch();
    const modalRef = useRef();
    const [selectedOrder, setSelectedOrder] = useState(null);

    const { generatingInvoice } = useSelector(state => state.adminData);

    const handleInvoiceGeneration = (orderId) => {
        dispatch(generateInvoice(orderId))
            .unwrap()
        // .then(() => {
        // })
        // .catch((error) => {
        //     console.error('Failed to generate invoice:', error);
        // });
    }

    const handleOrderDetails = (order) => {
        setSelectedOrder(order);
    };

    const handleClickOutside = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            setSelectedOrder(null);
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
                onClick={() => handleOrderDetails(order)}
                className="bg-[var(--background-color)] px-2 py-1 rounded hover:bg-white font-semibold"
            >
                Order Details
            </button>
            {selectedOrder && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div ref={modalRef} className="bg-[var(--background-color)] flex flex-col gap-2 mx-2 p-6 rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
                        <h2 className="text-2xl font-bold mb-4">Order Details</h2>
                        <p><strong>Order No:</strong> {selectedOrder.orderNo}</p>
                        <UpdateInvoiceNo selectedOrder={selectedOrder} />
                        <p><strong>Receiver:</strong> {selectedOrder.userName}</p>
                        <p><strong>Phone:</strong> {selectedOrder.phoneNumber}</p>
                        <p><strong>Email:</strong> {selectedOrder.userEmail}</p>
                        <p><strong>Shipping Address:</strong> {address(selectedOrder.shippingAddress)}</p>
                        <p><strong>Payment Method:</strong> {selectedOrder.paymentMethod}</p>
                        <p><strong>Payment Status:</strong> {selectedOrder.paymentStatus}</p>
                        <p><strong>Order Status:</strong> {selectedOrder.orderStatus}</p>
                        <p><strong>Sub Total:</strong> ₹ {selectedOrder.subTotal} {selectedOrder.CODCharge !== undefined && selectedOrder.CODCharge !== 0  &&  '(COD charges included)'} </p>
                        {selectedOrder.CODCharge !== undefined && selectedOrder.CODCharge !== 0 && (
                            <p><strong>COD Charges:</strong> ₹ {selectedOrder.CODCharge}</p>
                        )}
                        <p><strong>Shipping Fee:</strong> {selectedOrder.shippingFee === 0 ? 'FREE' : '₹' + selectedOrder.shippingFee}</p>
                        <p><strong>Total:</strong> ₹ {selectedOrder.subTotal + selectedOrder.shippingFee}</p>
                        <h3 className="text-xl font-bold mt-4 mb-2">Order Items:</h3>
                        <ul>
                            {selectedOrder.orderDetails[0] !== null && selectedOrder.orderDetails.map((item, index) => (
                                <li key={item.id}>({index + 1}) -- Item: {item['name-url']} | Quantity: {item.quantity} | Weight: {item.weight} </li>
                            ))}
                        </ul>
                        {/* <button
                            className="flex justify-center items-center gap-1 mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                            onClick={() => handleInvoiceGeneration(selectedOrder._id)}
                        >
                            {!generatingInvoice ? ' Generate Invoice' : <Loader className='animate-spin' />}
                        </button> */}
                        <SubmitButton
                            id='generateInvoiceBtn'
                            isSubmitting={generatingInvoice}
                            text={!generatingInvoice ? ' Generate Invoice' : <Loader className='animate-spin' />}
                            action={() => handleInvoiceGeneration(selectedOrder._id)}
                        />
                    </div>
                </div>
            )}

        </>
    )
}

export default AdminOrderDetails
