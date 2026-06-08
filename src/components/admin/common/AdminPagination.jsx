// import React, { useEffect, useMemo } from 'react';
// import { ChevronLeft, ChevronRight } from 'lucide-react';

// const AdminPagination = ({
//     currentPage,
//     paginate,
//     sortedOrders,
//     setCurrentData,
// }) => {
//     const ordersPerPage = 6;

//     // Memoize the calculation of data to be shown and total pages
//     const { curData, totalPages } = useMemo(() => {
//         const indexOfLastOrder = currentPage * ordersPerPage;
//         const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
//         const curData = sortedOrders.slice(indexOfFirstOrder, indexOfLastOrder);
//         const totalPages = Math.ceil(sortedOrders.length / ordersPerPage);

//         return { curData, totalPages };
//     }, [currentPage, sortedOrders]);

//     // Update the current data whenever the data or current page changes
//     useEffect(() => {
//         setCurrentData(curData);
//     }, [curData, setCurrentData]);

//     return (
//         <div className="mt-4 flex flex-wrap gap-y-4 justify-center items-center space-x-2">
//             <button
//                 onClick={() => paginate(currentPage - 1)}
//                 disabled={currentPage === 1}
//                 aria-label="Previous page"
//                 className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//                 <ChevronLeft />
//             </button>
//             {[...Array(totalPages).keys()].map(number => (
//                 <button
//                     key={number + 1}
//                     onClick={() => paginate(number + 1)}
//                     aria-label={`Go to page ${number + 1}`}
//                     className={`px-3 py-1 rounded ${currentPage === number + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
//                 >
//                     {number + 1}
//                 </button>
//             ))}
//             <button
//                 onClick={() => paginate(currentPage + 1)}
//                 disabled={currentPage === totalPages}
//                 aria-label="Next page"
//                 className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//                 <ChevronRight />
//             </button>
//         </div>
//     );
// };

// export default AdminPagination;

import  { useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const AdminPagination = ({
  curData,
  currentPage,
  totalPages,
  paginate,
//   sortedOrders,
  setCurrentData,
}) => {
  // const ordersPerPage = 6;

  // const { curData, totalPages } = useMemo(() => {
  //     const indexOfLastOrder = currentPage * ordersPerPage;
  //     const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  //     const curData = sortedOrders.slice(indexOfFirstOrder, indexOfLastOrder);
  //     const totalPages = Math.ceil(sortedOrders.length / ordersPerPage);
  //     return { curData, totalPages };
  // }, [currentPage, sortedOrders]);

  useEffect(() => {
    setCurrentData(curData);
  }, [curData, setCurrentData]);

  // Returns the window of 7 page numbers centered around currentPage
  const getPageWindow = () => {
    const maxVisible = 7;
    if (totalPages <= maxVisible) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    const half = Math.floor(maxVisible / 2);
    let start = currentPage - half;
    let end = currentPage + half;

    if (start < 1) {
      start = 1;
      end = maxVisible;
    }
    if (end > totalPages) {
      end = totalPages;
      start = totalPages - maxVisible + 1;
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  const pageWindow = getPageWindow();
  const showStartEllipsis = pageWindow[0] > 2;
  const showEndEllipsis = pageWindow[pageWindow.length - 1] < totalPages - 1;
  const showFirst = pageWindow[0] > 1;
  const showLast = pageWindow[pageWindow.length - 1] < totalPages;

  const btnClass = (page) =>
    `px-3 py-1 rounded ${
      currentPage === page
        ? "bg-blue-500 text-white"
        : "bg-gray-200 hover:bg-gray-300"
    }`;

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

      {showFirst && (
        <button
          onClick={() => paginate(1)}
          aria-label="Go to page 1"
          className={btnClass(1)}
        >
          1
        </button>
      )}
      {showStartEllipsis && <span className="px-1 text-gray-500">…</span>}

      {pageWindow.map((page) => (
        <button
          key={page}
          onClick={() => paginate(page)}
          aria-label={`Go to page ${page}`}
          className={btnClass(page)}
        >
          {page}
        </button>
      ))}

      {showEndEllipsis && <span className="px-1 text-gray-500">…</span>}
      {showLast && (
        <button
          onClick={() => paginate(totalPages)}
          aria-label={`Go to page ${totalPages}`}
          className={btnClass(totalPages)}
        >
          {totalPages}
        </button>
      )}

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
