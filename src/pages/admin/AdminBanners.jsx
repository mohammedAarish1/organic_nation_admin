import React, { lazy, Suspense, useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import Loader from "../../components/common/Loader";
const AdminTable = lazy(() => import("../../components/admin/common/AdminTable"))

const headers = [
  { key: 'image', label: 'Image' },
  { key: 'title', label: 'Title' },
  { key: 'description', label: 'Description' },
  { key: 'redirectionUrl', label: 'Redirection URL' },
  { key: 'order', label: 'Order' },
]

const apiUrl = import.meta.env.VITE_BACKEND_URL;

// Placeholder data (replace this with API data in production)
// const initialBanners = [
//   {
//     id: 1,
//     image: "https://via.placeholder.com/150",
//     title: "Summer Sale",
//     description: "50% off on all products!",
//     redirectionUrl: "/sale",
//     order: 1,
//   },
//   {
//     id: 2,
//     image: "https://via.placeholder.com/150",
//     title: "New Arrivals",
//     description: "Check out the latest products.",
//     redirectionUrl: "/new-arrivals",
//     order: 2,
//   },
// ];

const AdminBanners = () => {
  const [bannersList, setBannersList] = useState([]);

  const getMainBanners = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/main/banners`)
      if (response.data) {
        setBannersList(response.data.mainBanners)
      }
    } catch (error) {
      throw error
    }
  }


  useEffect(() => {
    getMainBanners();
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

