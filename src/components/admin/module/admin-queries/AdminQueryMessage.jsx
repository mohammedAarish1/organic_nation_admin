import React, { useEffect, useRef, useState } from 'react'

const AdminQueryMessage = ({ query }) => {
    const modalRef = useRef();
    const [selectedQuery, setSelectedQuery] = useState(null);

    const handleClickOutside = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            setSelectedQuery(null);
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
                onClick={() => setSelectedQuery(query)}
                className="bg-green-600 text-white px-2 py-1 rounded hover:bg-green-800"
            >
                View Message
            </button>
            {selectedQuery && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div ref={modalRef} className="bg-white p-6 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">

              <h4 className='font-semibold'>Message:-</h4>
              <p>{selectedQuery?.message}</p>
            </div>
          </div>
        )}
        </>
    )
}

export default AdminQueryMessage;
