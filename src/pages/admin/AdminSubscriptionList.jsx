import  { lazy, Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../components/common/Loader';
import { getList } from '../../features/admin/adminData';
const AdminTable = lazy(() => import('../../components/admin/common/AdminTable'))

const headers = [
  { key: 'email', label: 'Email' },
  { key: 'subscribedAt', label: 'Date' }
]

const AdminSubscriptionList = () => {
  const dispatch = useDispatch()
  const { subscription_list, loading } = useSelector(state => state.adminData);
  useEffect(() => {
    if(subscription_list.length===0){
      dispatch(getList('newsletterEmails'))
    }
  }, [])

  if (loading) return <div>Loading..</div>
  return (
    <div>
      <Suspense fallback={<Loader height='200px' />}>
        <AdminTable
          title='Subscription List'
          headers={headers}
          data={subscription_list}
        />
      </Suspense>
    </div>
  );
};

export default AdminSubscriptionList;







