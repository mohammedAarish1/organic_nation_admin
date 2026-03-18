import React, { lazy, Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../components/common/Loader';
import { getList } from '../../features/admin/adminData';
const AdminTable = lazy(() => import('../../components/admin/common/AdminTable'))

const headers = [
  { key: 'fullName', label: 'Full Name' },
  { key: 'email', label: 'Email' },
  { key: 'phoneNumber', label: 'Phone No' },
  { key: 'city', label: 'City' },
  { key: 'createdAt', label: 'Date' }
]

const AdminQueries = () => {
  const dispatch = useDispatch()
  const { totalUserQueries, loading } = useSelector(state => state.adminData);

  useEffect(() => {
    dispatch(getList('queries'))
  }, [])

  if (loading) return <div>Loading..</div>
  return (
    <div>
      <Suspense fallback={<Loader height='200px' />}>
        <AdminTable
          title='Queries'
          headers={headers}
          data={totalUserQueries}
        />
      </Suspense>
    </div>
  );
};

export default AdminQueries;







