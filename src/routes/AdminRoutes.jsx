import  { useEffect, useState, Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAdminData } from '../features/admin/adminSlice';
// import { getProductsData } from '../imports';
import { ToastContainer } from 'react-toastify';
import { CircleUserRound, Menu } from 'lucide-react';
import AdminSubscriptionList from '../pages/admin/AdminSubscriptionList';

// Lazy-load the admin components
const AdminDashboard = lazy(() => import('../pages/admin/AdminDashboard'));
const AdminOrders = lazy(() => import('../pages/admin/AdminOrders'));
const AdminSidebar = lazy(() => import('../components/admin/AdminSidebar'));
const AdminUsers = lazy(() => import('../pages/admin/AdminUsers'));
const AdminQueries = lazy(() => import('../pages/admin/AdminQueries'));
const AdminProducts = lazy(() => import('../pages/admin/AdminProducts'));
const AdminReturns = lazy(() => import('../pages/admin/AdminReturns'));
const AdminBanners = lazy(() => import('../pages/admin/AdminBanners'));

const AdminRoutes = () => {
  const dispatch = useDispatch();
  const [showSidebar, setShowSidebar] = useState(false);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const { admin } = useSelector(state => state.admin);
  const adminToken = JSON.parse(sessionStorage.getItem('adminToken'));

  useEffect(() => {
    if (adminToken) {
      dispatch(fetchAdminData(adminToken))
    }
  }, [adminToken, dispatch]);

  return (
    <div className="min-h-screen h-full">
      <div className='flex flex-row'>
        {/* Sidebar */}
        <div className={`w-full sm:w-64 adminSidebar`}>
          <div className={`${showSidebar && 'active'} h-full`}>
            <Suspense fallback={<div>Loading Sidebar...</div>}>
              <AdminSidebar setShowSidebar={setShowSidebar} />
            </Suspense>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-grow p-4 sm:p-8 h-full overflow-x-auto">
          {/* Admin Profile */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <CircleUserRound size={32} className='text-[var(--themeColor)]' />
              {isSidebarExpanded && (
                <div>
                  <h2 className="text-lg font-bold">{admin && admin.name}</h2>
                  <p className="text-gray-500">Admin</p>
                </div>
              )}
            </div>
            <div className='flex gap-2'>
              <button
                className="px-4 py-2 bg-gray-800 text-white rounded-md sm:hidden block"
                onClick={() => setShowSidebar(!showSidebar)}
              >
                <Menu />
              </button>
            </div>
          </div>

          <ToastContainer position='bottom-right' autoClose={1000} />

          <Suspense fallback={<div>Loading Content...</div>}>
            <Routes>
              <Route path="/dashboard" element={<AdminDashboard />} />
              <Route path="/orders" element={<AdminOrders />} />
              <Route path="/users" element={<AdminUsers />} />
              <Route path="/queries" element={<AdminQueries />} />
              <Route path="/products" element={<AdminProducts />} />
              <Route path="/subscription-list" element={<AdminSubscriptionList />} />
              <Route path="/returns" element={<AdminReturns />} />
              <Route path="/banners" element={<AdminBanners />} />
            </Routes>
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default AdminRoutes;
