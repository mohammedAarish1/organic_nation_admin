import React, { useEffect, useMemo } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const AdminPagination = ({
    currentPage,
    paginate,
    sortedOrders,
    setCurrentData,
}) => {
    const ordersPerPage = 6;

    // Memoize the calculation of data to be shown and total pages
    const { curData, totalPages } = useMemo(() => {
        const indexOfLastOrder = currentPage * ordersPerPage;
        const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
        const curData = sortedOrders.slice(indexOfFirstOrder, indexOfLastOrder);
        const totalPages = Math.ceil(sortedOrders.length / ordersPerPage);

        return { curData, totalPages };
    }, [currentPage, sortedOrders]);

    // Update the current data whenever the data or current page changes
    useEffect(() => {
        setCurrentData(curData);
    }, [curData, setCurrentData]);

    return (
        <div className="mt-4 flex flex-wrap gap-y-4 justify-center items-center space-x-2">
            <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                aria-label="Previous page"
                className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                <ChevronLeft />
            </button>
            {[...Array(totalPages).keys()].map(number => (
                <button
                    key={number + 1}
                    onClick={() => paginate(number + 1)}
                    aria-label={`Go to page ${number + 1}`}
                    className={`px-3 py-1 rounded ${currentPage === number + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
                >
                    {number + 1}
                </button>
            ))}
            <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
                aria-label="Next page"
                className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                <ChevronRight />
            </button>
        </div>
    );
};

export default AdminPagination;

