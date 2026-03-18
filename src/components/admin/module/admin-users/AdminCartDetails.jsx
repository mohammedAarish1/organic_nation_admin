import React, { useEffect, useRef, useState } from 'react'

const AdminCartDetails = ({ cart }) => {

    const modalRef = useRef();
    const [userCart, setUserCart] = useState(null); // needed to show the cart item of the user

    const handleClickOutside = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            setUserCart(null);
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
                onClick={() => setUserCart(cart)}
                className="bg-green-600 text-white px-2 py-1 rounded hover:bg-green-800"
            >
                Cart Details
            </button>
            {userCart && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                <div ref={modalRef} className="bg-white p-6 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                    <h2 className="text-2xl font-bold mb-4">Cart Details</h2>
                    <ul>
                        {userCart?.totalCartAmount === 0 ? ('The cart is Empty !!') : (
                            userCart?.items.map((item) => (
                                <li key={item.productId}>Item: <span className='font-bold'>{item.productName}</span>, Quantity:{item.quantity} </li>
                            ))
                        )}
                    </ul>

                </div>
            </div>
            )}
            
        </>
    )
}

export default AdminCartDetails;
