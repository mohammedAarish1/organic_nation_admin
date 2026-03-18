// import React from 'react'
// import BannerImage from '../../image/BannerImage';
// import AdminOrderDetails from '../module/admin-orders/AdminOrderDetails';
// import AdminOrderStatus from '../module/admin-orders/AdminOrderStatus';
// import AdminPaymentStatus from '../module/admin-orders/AdminPaymentStatus';
// import AdminCartDetails from '../module/admin-users/AdminCartDetails';
// import AdminUserStatus from '../module/admin-users/AdminUserStatus';
// import AdminQueryMessage from '../module/admin-queries/AdminQueryMessage';
// import AdminProductForm from '../module/admin-products/AdminProductForm';
// import AdminDelete from './AdminDelete';
// import AdminReturnDetails from '../module/admin-returns/AdminReturnDetails';
// import AdminReturnStatus from '../module/admin-returns/AdminReturnStatus';
// import AdminReturnImgVideo from '../module/admin-returns/AdminReturnImgVideo';

// const AdminTableBody = ({
//     title,
//     currentData,
//     headers,
//     handleStatusChange
// }) => {
//     return (
//         <tbody>
//             {currentData?.map((data) => {
//                 return (
//                     <tr key={data?._id} className="border-b hover:bg-gray-100">

//                         <td className="p-3">
//                             <input type="checkbox" className="form-checkbox" />
//                         </td>
//                         {headers.map(header => {

//                             if (header.key === 'receiverDetails') {
//                                 return <td key={header.label} className="p-3">{data[header.key]?.name}</td>;
//                             } else if (header.label === 'Date') {
//                                 return <td key={header.label} className="p-3">{new Date(data[header.key]).toLocaleDateString()}</td>
//                             } else if (header.label === 'Time') {
//                                 return <td key={header.label} className="p-3 text-xs">{new Date(data[header.key]).toLocaleTimeString()}</td>
//                             } else if (header.label === 'Image') {
//                                 return <BannerImage
//                                     src={{
//                                         sm: data.image.sm,
//                                         md: data.image.md,
//                                         lg: data.image.lg
//                                     }}
//                                     alt={data.image.redirectionUrl}
//                                     className="w-16 h-16 object-cover rounded-md"
//                                     blurSrc={data.image.blur}
//                                 />
//                             } else {
//                                 return (
//                                     <td key={header.label} className="p-3">{data[header.key]}</td>
//                                 )
//                             }
//                         })}
//                         <td className="p-3">
//                             <div className="flex justify-end items-center gap-5 ">
//                                 <div className="flex flex-col gap-2">
//                                     {title === 'Orders' && (
//                                         <>
//                                             <AdminOrderDetails order={data} />

//                                             <AdminOrderStatus curStatus={data.orderStatus} handleOnChange={(curValue) => handleStatusChange(title, data._id, curValue)} />
//                                             {/* ============== payment status ==========  */}

//                                             <AdminPaymentStatus curStatus={data.paymentStatus} handleOnChange={(curValue) => handleStatusChange('Payment', data._id, curValue)} />
//                                         </>
//                                     )}
//                                     {title === 'Users' && (
//                                         <>
//                                             <AdminCartDetails cart={data.cart} />
//                                             <AdminUserStatus role={data.role} handleOnChange={(curValue) => handleStatusChange(title, data._id, curValue)} />
//                                         </>
//                                     )}
//                                     {title === 'Queries' && (
//                                         <>
//                                             <AdminQueryMessage query={data} />
//                                         </>
//                                     )}

//                                     {title === 'Products' && (
//                                         <>
//                                             <AdminProductForm
//                                                 type='edit'
//                                                 product={data}
//                                             />
//                                         </>
//                                     )}
//                                     {title === 'Returns' && (
//                                         <>
//                                             <AdminReturnDetails curReturn={data} />
//                                             <AdminReturnImgVideo curReturn={data}/>
//                                             <AdminReturnStatus curStatus={data.returnStatus} handleOnChange={(curValue) => handleStatusChange(title, data._id, curValue)} />
//                                         </>
//                                     )}
//                                 </div>
//                                 <AdminDelete handleDelete={() => handleStatusChange(title, data._id, '')} />
//                             </div>
//                         </td>
//                     </tr>
//                 )
//             }
//             )}
//         </tbody>
//     )
// }

// export default AdminTableBody;



import React, { memo, useMemo } from 'react';
import { Suspense, lazy } from 'react';
import Loader from '../../common/Loader';

// Lazy load complex subcomponents
// const BannerImage = lazy(() => import('../../image/BannerImage'));
const AdminOrderDetails = lazy(() => import('../module/admin-orders/AdminOrderDetails'));
const AdminOrderStatus = lazy(() => import('../module/admin-orders/AdminOrderStatus'));
const AdminPaymentStatus = lazy(() => import('../module/admin-orders/AdminPaymentStatus'));
const AdminCartDetails = lazy(() => import('../module/admin-users/AdminCartDetails'));
const AdminUserStatus = lazy(() => import('../module/admin-users/AdminUserStatus'));
const AdminQueryMessage = lazy(() => import('../module/admin-queries/AdminQueryMessage'));
const AdminProductForm = lazy(() => import('../module/admin-products/AdminProductForm'));
const AdminDelete = lazy(() => import('./AdminDelete'));
const AdminReturnDetails = lazy(() => import('../module/admin-returns/AdminReturnDetails'));
const AdminReturnStatus = lazy(() => import('../module/admin-returns/AdminReturnStatus'));
const AdminReturnImgVideo = lazy(() => import('../module/admin-returns/AdminReturnImgVideo'));


const AdminTableBody = memo(({
    title,
    currentData,
    headers,
    handleStatusChange
}) => {
    // Memoize the rendered rows to prevent unnecessary re-renders
    const renderedRows = useMemo(() => {
        return currentData?.map((data) => (
            <tr key={data?._id} className="border-b hover:bg-gray-100">
                <td className="p-3">
                    <input type="checkbox" className="form-checkbox" />
                </td>
                {headers.map(header => {
                    // Simplified rendering logic with early returns
                    switch (header.label) {
                        case 'Total':
                            return <td key={header.label} className="p-3">{Math.round(data[header.key] + data['shippingFee'])}</td>;
                        // case 'Receiver':
                        //     return <td key={header.label} className="p-3">{data[header.key]?.name}</td>;
                        case 'Date':
                            return <td key={header.label} className="p-3">{new Date(data[header.key]).toLocaleDateString()}</td>;
                        case 'Time':
                            return <td key={header.label} className="p-3 text-xs">{new Date(data[header.key]).toLocaleTimeString()}</td>;
                        case 'Image':
                            return (
                                <td key={header.label} className="p-3">
                                    <img
                                        src={data.image}
                                        alt="Banner Image"
                                        className="w-16 h-16 object-cover rounded-md"

                                    />
                                    {/* <Suspense fallback={<Loader height="10px" />} key={header.label}>

                                        <BannerImage
                                            src={{
                                                sm: data.image.sm,
                                                md: data.image.md,
                                                lg: data.image.lg
                                            }}
                                            alt={data.image.redirectionUrl}
                                            className="w-16 h-16 object-cover rounded-md"
                                            blurSrc={data.image.blur}
                                        />
                                    </Suspense> */}
                                </td>
                            );
                        default:
                            return <td key={header.label} className="p-3">{data[header.key]}</td>;
                    }
                })}
                <td className="p-3">
                    <div className="flex justify-end items-center gap-5">
                        <div className="flex flex-col gap-2">
                            <Suspense fallback={<Loader height='10px' />}>
                                {title === 'Orders' && (
                                    <>
                                        <AdminOrderDetails order={data} />
                                        <AdminOrderStatus
                                            curStatus={data.orderStatus}
                                            handleOnChange={(curValue) => handleStatusChange(title, data._id, curValue)}
                                        />
                                        <AdminPaymentStatus
                                            curStatus={data.paymentStatus}
                                            handleOnChange={(curValue) => handleStatusChange('Payment', data._id, curValue.toUpperCase())}
                                        />
                                    </>
                                )}
                                {title === 'Users' && (
                                    <>
                                        <AdminCartDetails cart={data.cart} />
                                        <AdminUserStatus
                                            role={data.role}
                                            handleOnChange={(curValue) => handleStatusChange(title, data._id, curValue)}
                                        />
                                    </>
                                )}
                                {title === 'Queries' && (
                                    <AdminQueryMessage query={data} />
                                )}
                                {title === 'Products' && (
                                    <AdminProductForm
                                        type='edit'
                                        product={data}
                                    />
                                )}
                                {title === 'Returns' && (
                                    <>
                                        <AdminReturnDetails curReturn={data} />
                                        <AdminReturnImgVideo curReturn={data} />
                                        <AdminReturnStatus
                                            curStatus={data.returnStatus}
                                            handleOnChange={(curValue) => handleStatusChange(title, data._id, curValue)}
                                        />
                                    </>
                                )}


                            </Suspense>
                        </div>
                        <Suspense fallback={<div>Loading...</div>}>
                            <AdminDelete handleDelete={() => handleStatusChange(title, data._id, '')} />
                        </Suspense>
                    </div>
                </td>
            </tr>
        ));
    }, [currentData, headers, title, handleStatusChange]);

    return <tbody>{renderedRows}</tbody>;
});

export default AdminTableBody;