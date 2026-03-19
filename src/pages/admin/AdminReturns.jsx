import  { lazy, Suspense, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getList, getReturnsByStatus } from "../../features/admin/adminData";
import Loader from "../../components/common/Loader";
import StatusTabs from "../../components/common/StatusTabs";

const AdminTable = lazy(
  () => import("../../components/admin/common/AdminTable"),
);

const headers = [
  { key: "invoiceNumber", label: "Invoice Number" },
  { key: "itemName", label: "Item Name" },
  { key: "weight", label: "Weight" },
  { key: "quantity", label: "Quantity" },
  { key: "returnStatus", label: "Return Status" },
  { key: "returnOptions", label: "Requested for" },
  { key: "createdAt", label: "Date" },
];

const STATUS_BUTTONS = [
  {
    id: "requested",
    label: "Requested",
    borderColor: "orange-500",
    iconBgColor: "EEF2FF",
    iconColor: "blue",
    shadowColor: "blue-400",
    getCount: (totalReturns) =>
      totalReturns?.filter(
        (curReturn) => curReturn.returnStatus === "requested",
      ).length || 0,
  },

  {
    id: "rejected",
    label: "Rejected",
    borderColor: "orange-500",
    iconBgColor: "EEF2FF",
    iconColor: "red",
    shadowColor: "red-500",
    getCount: (totalReturns) =>
      totalReturns?.filter((curReturn) => curReturn.returnStatus === "rejected")
        .length || 0,
  },
  {
    id: "inProgress",
    label: "In Progress",
    borderColor: "purple-500",
    iconBgColor: "ECFDF5",
    iconColor: "purple",
    shadowColor: "purple-400",
    getCount: (totalReturns) =>
      totalReturns?.filter(
        (curReturn) => curReturn.returnStatus === "inProgress",
      ).length || 0,
  },
  {
    id: "completed",
    label: "Completed",
    borderColor: "orange-500",
    iconBgColor: "FFFBEB",
    iconColor: "orange",
    shadowColor: "orange-400",
    getCount: (totalReturns) =>
      totalReturns?.filter(
        (curReturn) => curReturn.returnStatus === "completed",
      ).length || 0,
  },
];

const AdminReturns = () => {
  const dispatch = useDispatch();

  const { returns, loading } = useSelector((state) => state.adminData);
  const { totalReturns, filteredReturns, curReturnStatusTab } = returns;
  // const adminToken = JSON.parse(sessionStorage.getItem("adminToken"));
  useEffect(() => {
    if (totalReturns.length === 0) {
      dispatch(getList("returns"));
    }
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="">
      {/* Boxes */}

      <div className="py-5 font-serif">
        <div className="flex flex-wrap sm:gap-10 gap-2">
          {STATUS_BUTTONS.map((button) => (
            <StatusTabs
              key={button.id}
              isActive={curReturnStatusTab === button.id}
              count={button.getCount(totalReturns)}
              label={button.label}
              onClick={() => {
                dispatch(getReturnsByStatus(button.id));
              }}
              borderColor={button.borderColor}
              iconBgColor={button.iconBgColor}
              iconColor={button.iconColor}
              shadowColor={button.shadowColor}
            />
          ))}
        </div>
      </div>
      {/*  all orders  */}
      <div className="mt-6 flex flex-col gap-20 ">
        {/* no orders messgae  */}

        {/* {ordersByStatus.orderData?.length === 0 && (
          <div className='flex flex-col gap-8 justify-center items-start xs:text-2xl font-mono'>
            <p className=''>You have no orders !!!</p>
            <div>
              <Link to="/shop/all" className=" flex underline-hover text-[var(--background-color)] max-w-max hover:text-orange-500 justify-center items-center gap-2 py-1   font-semibold rounded-lg  uppercase "> <FaArrowLeftLong /><span className='text-sm sm:text-[16px]'>Continue Shopping</span></Link>
            </div>
          </div>
        )} */}

        <Suspense fallback={<Loader height="200px" />}>
          <AdminTable
            title="Returns"
            headers={headers}
            data={filteredReturns}
          />
        </Suspense>
      </div>
    </div>
  );
};

export default AdminReturns;
