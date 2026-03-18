// ReportGenerator.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { generateReport } from '../../features/admin/adminData';
// react icons 
import { Download, Loader } from 'lucide-react';



const ReportGenerator = ({title,type}) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useDispatch();
  const { generatingSaleReport, error } = useSelector((state) => state.adminData);


  const handleGenerateReport = async () => {
    setErrorMessage('');

    if (!startDate || !endDate) {
      setErrorMessage('Please select both start and end dates.');
      return;
    }

    try {
      await dispatch(generateReport({ startDate, endDate ,type})).unwrap();
    } catch (error) {
      setErrorMessage(error.message || 'Failed to generate report. Please try again.');
    }
  };



  return (
    

    <div className="max-w-2xl mt-10 p-6  rounded-lg shadow-md">
      <h2 className="text-2xl mb-6 text-gray-800">{title}</h2>
      <div className="space-y-4">
        <div>
          <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
            Start Date:
          </label>
          <input
            id="startDate"
            type="date"
            value={startDate}
            min={'2024-07-30'}
            onChange={(e) => setStartDate(e.target.value)}
            className="mt-1 px-4 py-2 outline-none cursor-pointer block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <div>
          <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">
            End Date:
          </label>
          <input
            id="endDate"
            type="date"
            value={endDate}
            min={'2024-09-03'}
            onChange={(e) => setEndDate(e.target.value)}
            className="mt-1 px-4 py-2 outline-none cursor-pointer block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
      </div>
      <button
        onClick={handleGenerateReport}
        disabled={generatingSaleReport}
        className={`mt-6 w-full px-4 py-2 outline-none cursor-pointer border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-500 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2  ${generatingSaleReport ? ' cursor-not-allowed' : ''}`}
      >
        {generatingSaleReport ? <span className='flex items-center justify-center'><Loader size={16} /> </span> : <span className='flex items-center justify-center gap-2 text-white'>Download Report  <Download size={16} /></span>}
      </button>
      {errorMessage && <p className="mt-2 text-sm text-red-600">{errorMessage}</p>}
      {error && <p className="mt-2 text-sm text-red-600">Error: {error}</p>}
    </div>

  );
};

export default ReportGenerator;