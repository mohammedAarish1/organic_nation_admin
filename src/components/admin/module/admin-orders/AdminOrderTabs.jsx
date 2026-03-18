import React from 'react'
import { getOrdersByStatus } from '../../../../features/admin/adminData';
import { useDispatch, useSelector } from 'react-redux';
import StatusTabs from '../../../common/StatusTabs';

const AdminOrderTabs = () => {
    const dispatch = useDispatch()
    const { orders } = useSelector((state) => state.adminData);
    const { totalOrders, curOrderStatusTab } = orders
    const STATUS_BUTTONS = [
        {
            id: 'total',
            label: 'Total Order',
            borderColor: 'blue-500',
            iconBgColor: 'EEF2FF',
            iconColor: 'blue',
            shadowColor: 'blue-400',
            getCount: (totalOrders) => totalOrders?.length || 0
        },
        {
            id: 'active',
            label: 'Active Order',
            borderColor: 'green-500',
            iconBgColor: 'ECFDF5',
            iconColor: 'green',
            shadowColor: 'green-400',
            getCount: (totalOrders) => totalOrders?.filter((order) => order.orderStatus === "active").length || 0
        },
        {
            id: 'dispatched',
            label: 'Dispatched',
            borderColor: 'purple-500',
            iconBgColor: 'ECFDF5',
            iconColor: 'green',
            shadowColor: 'purple-400',
            getCount: (totalOrders) => totalOrders?.filter((order) => order.orderStatus === "dispatched").length || 0
        },
        {
            id: 'completed',
            label: 'Completed',
            borderColor: 'orange-600',
            iconBgColor: 'FFFBEB',
            iconColor: 'orange',
            shadowColor: 'orange-400',
            getCount: (totalOrders) => totalOrders?.filter((order) => order.orderStatus === "completed").length || 0
        },
        {
            id: 'cancelled',
            label: 'Cancelled',
            borderColor: 'red-500',
            iconBgColor: 'FEF2F2',
            iconColor: 'red',
            shadowColor: 'red-500',
            getCount: (totalOrders) => totalOrders?.filter((order) => order.orderStatus === "cancelled").length || 0
        }
    ];


    return (

        <div className='py-5 font-serif'>
            <div className='flex flex-wrap sm:gap-10 gap-2'>
                {STATUS_BUTTONS.map(button => (
                    <StatusTabs
                        key={button.id}
                        isActive={curOrderStatusTab === button.id}
                        count={button.getCount(totalOrders)}
                        label={button.label}
                        onClick={() => dispatch(getOrdersByStatus(button.id))}
                        borderColor={button.borderColor}
                        iconBgColor={button.iconBgColor}
                        iconColor={button.iconColor}
                        shadowColor={button.shadowColor}
                    />
                ))}
            </div>
        </div>

    )
}

export default AdminOrderTabs
