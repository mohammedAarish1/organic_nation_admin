import React, { lazy, Suspense, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { deleteDocumentFromDatabase, updateCurrentStatus } from '../../../features/admin/adminData';
import { toast } from 'react-toastify';
import Loader from '../../common/Loader';
import { ArrowUpDown, RefreshCw } from 'lucide-react';

const Alert = lazy(() => import('../../alert/Alert'))
const AdminProductForm = lazy(() => import('../module/admin-products/AdminProductForm'))
const AdminBannerForm = lazy(() => import('../module/admin-banners/AdminBannerForm'))
const AdminSearch = lazy(() => import('./AdminSearch'))
const AdminPagination = lazy(() => import('./AdminPagination'))
const AdminTableBody = lazy(() => import('./AdminTableBody'))


const AdminTable = ({
    title,
    headers,
    data
}) => {
    const dispatch = useDispatch()
    const [sortedOrders, setSortedOrders] = useState([]);
    const [sortDirection, setSortDirection] = useState('desc');
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [curStatusAndId, setCurStatusAndId] = useState(null);
    const { loading } = useSelector(state => state.adminData);
    const [currentData, setCurrentData] = useState([]);

    const handleSort = () => {
        setSortDirection(current => current === 'asc' ? 'desc' : 'asc');
    };

    const handleStatusChange = (type, id, status) => {
        setCurStatusAndId({ type, id, status })
        setIsAlertOpen(true);
    }

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const hideAlert = () => {
        setCurStatusAndId(null)
        setIsAlertOpen(false);

    };


    const updateStatus = (deliveryDate) => {
        const { type, id, status } = curStatusAndId;

        const payload = { id, collection: type, status, additionalData: deliveryDate ? { deliveryDate } : {} }

        if (type === 'Orders') {
            payload.field = "orderStatus"
        } else if (type === 'Payment') {
            payload.field = "paymentStatus"
        } else if (type === 'Users') {
            payload.field = "role"
        } else if (type === 'Returns') {
            payload.field = "returnStatus"
        }


        dispatch(updateCurrentStatus(payload))
            .then(res => {
                if (res.meta.requestStatus === 'fulfilled') {
                    toast.info('Updated Successfully')
                }
            })
        hideAlert()
    }


    const handleDelete = () => {
        const { type, id } = curStatusAndId;
        dispatch(deleteDocumentFromDatabase({ collection: type, id }))
            .then(() => {
                toast.success("Deleted Successfully");
                hideAlert();
            })

    }

    return (
        <div className="  p-4 w-full text-sm font-sans">
            <div className="flex justify-between items-center mb-4 ">
                <h2 className="text-2xl font-bold">{title}</h2>
                <div className="flex items-center">
                    {title === 'Banners' && (
                        <>
                            <Suspense fallback={<Loader height="100px" />}>
                                <AdminBannerForm />
                            </Suspense>
                        </>
                    )}
                    <Suspense fallback={<Loader height="10px" />}>
                        <AdminSearch
                            data={data}
                            title={title}
                            setSortedOrders={setSortedOrders}
                            setCurrentPage={setCurrentPage}
                            sortDirection={sortDirection}
                        />
                    </Suspense>

                </div>

                {title === 'Products' ? (
                    <Suspense fallback={<Loader height="100px" />}>
                        <AdminProductForm
                            type='add'
                            product={null}
                        />
                    </Suspense>

                ) : (
                    <button
                        // onClick={handleRefreshOrders} 
                        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                    >
                        <RefreshCw size={16} className={`${loading && 'animate-spin'}`} />
                    </button>
                )}

            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full shadow-md rounded-lg table-auto">
                    <thead className="bg-[var(--themeColor)] text-white">
                        <tr>
                            <th className="p-3">
                                <input type="checkbox" className="form-checkbox" />
                            </th>
                            {headers?.map((header) => (
                                <th key={header.label} className="p-3 text-left">
                                    <div className="flex items-center">
                                        {header.label}
                                        {header.label === 'Date' && (
                                            <button onClick={handleSort} className="ml-1">
                                                <ArrowUpDown size={14}  />
                                            </button>
                                        )}
                                    </div>
                                </th>
                            ))}
                            <th className="p-3">Actions</th>
                        </tr>
                    </thead>
                    <Suspense fallback={
                        <tbody>
                            <tr>
                                <td colSpan={headers?.length + 2}>
                                    <Loader height="150px" />
                                </td>
                            </tr>
                        </tbody>
                    }>

                        <AdminTableBody
                            title={title}
                            currentData={currentData}
                            headers={headers}
                            handleStatusChange={handleStatusChange}
                        />

                    </Suspense>
                </table>
            </div>

            {/* Pagination */}
            <Suspense fallback={<Loader height="10px" />}>
                <AdminPagination
                    currentPage={currentPage}
                    paginate={paginate}
                    sortedOrders={sortedOrders}
                    setCurrentData={setCurrentData}
                />

            </Suspense>
            {/* alert */}
            <Suspense fallback={<Loader height="50px" />}>
                <Alert
                    isOpen={isAlertOpen}
                    alertMessage={
                        curStatusAndId?.status === '' ?
                            `Are you sure, do you really want to delete this ?` :
                            `Do you want to update the ${curStatusAndId?.type === 'Users' ? 'user' : curStatusAndId?.type === 'Payment' ? 'payment' : curStatusAndId?.type === 'Returns' ? 'return' : 'order'} status to ${curStatusAndId?.status}`
                    }
                    hideAlert={hideAlert}
                    handleAction={curStatusAndId?.status === '' ? handleDelete : updateStatus}
                    updatingOrderStatus={curStatusAndId?.status === 'completed'}
                />
            </Suspense>

        </div>
    )
}

export default AdminTable;
