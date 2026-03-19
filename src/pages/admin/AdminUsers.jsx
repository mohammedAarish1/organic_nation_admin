import React, { lazy, Suspense, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/common/Loader";
import { getList } from "../../features/admin/adminData";

const AdminTable = lazy(
  () => import("../../components/admin/common/AdminTable"),
);
const ReportGenerator = lazy(
  () => import("../../components/admin/ReportGenerator"),
);

const headers = [
  { key: "fullName", label: "Name" },
  { key: "email", label: "Email" },
  { key: "phoneNumber", label: "Phone No" },
  { key: "createdAt", label: "Date" },
  { key: "createdAt", label: "Time" },
];

const AdminUsers = () => {
  const dispatch = useDispatch();
  const { loading, totalUsers } = useSelector((state) => state.adminData);
  useEffect(() => {
    if (totalUsers.length === 0) {
      dispatch(getList("users"));
    }
  }, []);

  if (loading) return <div>Loading..</div>;
  return (
    <div>
      <Suspense fallback={<Loader height="200px" />}>
        <AdminTable title="Users" headers={headers} data={totalUsers} />
      </Suspense>
      {/* <div>
        <Suspense fallback={<Loader height="200px" />}>
          <ReportGenerator title="Generate User Report" type="users" />
        </Suspense>
      </div> */}
    </div>
  );
};

export default AdminUsers;
