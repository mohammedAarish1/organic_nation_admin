import React, { useState } from 'react';

const Alert = ({ isOpen, alertMessage, hideAlert, handleAction, updatingOrderStatus = false }) => {

  const [selectedDate, setSelectedDate] = useState('');

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };


  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 font-sans">
      <div className="relative top-20 mx-auto p-5 border xs:w-96 w-72 shadow-lg rounded-md bg-[var(--background-color)]">
        <div className="mt-3 text-center">
          {/* <h3 className="text-lg leading-6 font-medium text-gray-900">Cancel Order</h3> */}
          <div className="mt-2 px-7 py-3">
            <p className="text-sm text-gray-800 font-bold">
              {alertMessage}
            </p>
          </div>
          {/* delivert date */}
          {updatingOrderStatus && (
            <form
              // onSubmit={handleSubmit}
              className="flex justify-center items-center gap-3 p-4 "
            >
              <label htmlFor="date-input" className=" text-sm">
                Delivery Date:
              </label>
              <input
                type="date"
                id="date-input"
                value={selectedDate}
                onChange={handleDateChange}
                className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

            </form>
          )}
          {/* delivert date end */}
          <div className="items-center px-4 py-3">
           {updatingOrderStatus?(
             <button
             onClick={()=>handleAction(selectedDate)}
             className="px-4 py-2 bg-red-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300"
           >
             Yes
           </button>
           ):(
             <button
              onClick={()=>handleAction()}
              className="px-4 py-2 bg-red-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300"
            >
              Yes
            </button>
           )}
            <button
              onClick={hideAlert}
              className="mt-3 px-4 py-2 bg-white text-gray-700 text-base font-medium rounded-md w-full shadow-sm border border-gray-300 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300"
            >
              No
            </button>
            {/* {actionMessageThree && (
              <button
                onClick={handleAction2}
                className="mt-3 px-4 py-2 bg-white text-gray-700 text-base font-medium rounded-md w-full shadow-sm border border-gray-300 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300"
              >
                {actionMessageThree}
              </button>
            )} */}

          </div>
        </div>
      </div>
    </div>
  );
};

export default Alert;