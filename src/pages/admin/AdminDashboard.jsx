import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getResourcesCount } from '../../features/admin/adminData';
// import AdminBulkEmail from './AdminBulkEmail';


const StatBox = ({ value, title, onClick }) => (
  <div
    className="cursor-pointer flex justify-center flex-col text-white hover:scale-95 duration-300 shadow-lg rounded-md p-4 lg:w-1/5 md:w-1/3 w-full h-36 hover:opacity-85 bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.25),_transparent_40%),radial-gradient(circle_at_center,_rgba(168,85,247,0.20),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(16,185,129,0.25),_transparent_40%),linear-gradient(to_bottom_right,#020617,#0f172a,#111827)] shadow-orange-300"
    onClick={onClick}
  >
    <p className="text-4xl font-bold">{value}</p>
    <h3 className="text-2xl font-bold mb-2">{title}</h3>
  </div>
);


const AdminDashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { resourcesCount, loading } = useSelector(state => state.adminData);
  // const products = useSelector((state) => state.filterData.products);

  const { orderCount, productCount, returnCount, queryCount, userCount,subscriptionCount } = resourcesCount;
  useEffect(() => {
    dispatch(getResourcesCount())
  }, [])
  if (loading) return <div>Loading..</div>

  const handleNavigate = (path) => () => {
    navigate(path);
  };

  const stats = [
    {
      value: userCount,
      title: 'Total Users',
      path: '/users',
    },
    {
      value: orderCount,
      title: 'Total Orders',
      path: '/orders',
    },
    {
      value: queryCount,
      title: 'Total Queries',
      path: '/queries',
    },
    {
      value: productCount,
      title: 'Total Products',
      path: '/products',
    },
    {
      value: returnCount,
      title: 'Total Returns',
      path: '/returns',
    },
    {
      value: subscriptionCount,
      title: 'Subscription',
      path: '/subscription-list',
    },
  ];

  return (
    <div>
      {/* Boxes */}
      <div className="flex justify-between gap-5 flex-wrap w-full">
        {stats.map((stat, index) => (
          <StatBox
            key={index}
            value={stat.value}
            title={stat.title}
            onClick={handleNavigate(stat.path)}
          />
        ))}
      </div>
      {/* <div>
        <AdminBulkEmail/>
      </div> */}
    </div>

  );
};

export default AdminDashboard;
