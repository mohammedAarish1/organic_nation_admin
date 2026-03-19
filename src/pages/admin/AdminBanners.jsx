import  { lazy, Suspense, useState } from "react";
import { useEffect } from "react";
import Loader from "../../components/common/Loader";
import { useDispatch, useSelector } from "react-redux";
import { getMainBanners } from "../../features/admin/adminData";
const AdminTable = lazy(() => import("../../components/admin/common/AdminTable"))

const headers = [
  { key: 'image', label: 'Image' },
  { key: 'title', label: 'Title' },
  { key: 'description', label: 'Description' },
  { key: 'redirectionUrl', label: 'Redirection URL' },
  { key: 'order', label: 'Order' },
]


const AdminBanners = () => {
  const dispatch = useDispatch();

const {bannersList}=useSelector(state=>state.adminData)
 


  useEffect(() => {
    if(bannersList.length===0){
      dispatch(getMainBanners())
    }
  }, [])

  // if (bannersList.length === 0) {
  //   return <div>Loading...</div>
  // }

  return (
    <div>
      <Suspense fallback={<Loader height='200px' />}>
        <AdminTable
          title='Banners'
          headers={headers}
          data={bannersList}
        />
      </Suspense>
    </div>
  );
};

export default AdminBanners;

