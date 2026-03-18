import React, { useEffect, useRef, useState } from 'react'
import ProductForm from './ProductForm'
import { CirclePlus, SquarePen } from 'lucide-react';

const AdminProductForm = ({ type, product }) => {
    const modalRef = useRef();
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const handleClickOutside = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            // setSelectedOrder(null);
            setIsFormVisible(false)
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);


        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    let actionButton;
    if (type == 'add') {
        actionButton = (
            <button
                type='submit'
                className='flex justify-center items-center gap-2 shadow-md shadow-green-500 px-4 py-2 rounded-md  hover:bg-green-600 hover:text-white'
                onClick={() => {
                    setSelectedProduct(product);
                    setIsFormVisible(true);
                }}
            >
                Add New Product <CirclePlus  className='text-xl' />
            </button>
        )
    } else if (type === 'edit') {
        actionButton = (
            <button
                onClick={() => {
                    setSelectedProduct(product);
                    setIsFormVisible(true)
                }}
                className="  px-2 py-1 rounded hover:text-green-800 flex justify-center"
            >
                <SquarePen  className='text-yellow-500' />
            </button>
        )
    }

    return (
        <div>
            {actionButton}
            {isFormVisible && (


                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div
                        ref={modalRef}
                        className="bg-white p-6 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                    >
                        <h2 className="text-2xl font-bold mb-4">Product Details</h2>


                        <ProductForm
                            product={selectedProduct}
                            onSubmit={() => setIsFormVisible(false)}
                            onCancel={() => setIsFormVisible(false)}
                        />
                        {/* <UploadProductImage
                            product={selectedProduct}
                        //   onSubmit={handleFormSubmit}
                        //   onCancel={handleFormCancel}
                        /> */}
                    </div>
                </div>
            )}
        </div>
    )
}

export default AdminProductForm;
