import { lazy, Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../components/common/Loader';
import { getList } from '../../features/admin/adminData';

const AdminTable = lazy(() => import('../../components/admin/common/AdminTable'))

const headers = [
    { key: 'name', label: 'Name' },
    { key: 'weight', label: 'Weight' },
    { key: 'price', label: 'MRP' },
    { key: 'discount', label: 'Discount %' },
    { key: 'availability', label: 'Stock' },
    { key: 'tax', label: 'Tax Rate' }
]

const AdminProducts = () => {
    const dispatch = useDispatch()
    const { loading, totalProducts } = useSelector((state) => state.adminData);

    useEffect(() => {
        dispatch(getList('products'));
    }, []);

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <Suspense fallback={<Loader height='200px' />}>
                <AdminTable
                    title='Products'
                    headers={headers}
                    data={totalProducts}
                />
            </Suspense>
        </div>
    );
};

export default AdminProducts;

