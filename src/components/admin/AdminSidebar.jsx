import { memo, useCallback } from 'react';
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { adminLogout } from "../../features/admin/adminSlice";
import CloseButton from "../button/CloseButton"

import { Home, ShoppingCart, User, StretchHorizontal, LogOut, MailQuestionMark, Undo2, Image } from 'lucide-react'

const AdminSidebar = memo(({ setShowSidebar }) => {
    const dispatch = useDispatch();
    // const adminToken = JSON.parse(sessionStorage.getItem('adminToken'));

    const handleLogout = useCallback(() => {
        dispatch(adminLogout());
    }, [dispatch]);

    const closeSidebar = useCallback(() => {
        setShowSidebar(false);
    }, [setShowSidebar]);

    const sidebarLinks = [
        { path: "/dashboard", icon: Home, label: "Dashboard" },
        { path: "/orders", icon: ShoppingCart, label: "Orders" },
        { path: "/users", icon: User, label: "Users" },
        { path: "/queries", icon: MailQuestionMark, label: "Queries" },
        { path: "/returns", icon: Undo2, label: "Returns" },
        { path: "/products", icon: StretchHorizontal, label: "Products" },
        { path: "/banners", icon: Image, label: "Banners" },
        { path: "", icon: LogOut, label: "Logout" },
    ];

    return (
        <div className={`bg-[var(--background-color)]  min-h-screen h-full duration-300 w-64 px-6 py-8`}>
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl font-bold">
                    <img
                        src="https://organicnationmages.s3.ap-south-1.amazonaws.com/logo/logo.png"
                        alt="logo"
                        className="w-16"
                    />
                </h1>
                <div className='sm:hidden px-4 text-end'>
                    <CloseButton action={closeSidebar}/>
                </div>
            </div>

            <nav className="space-y-4">
                {sidebarLinks.map(({ path, icon: Icon, label }) => (
                    <NavLink
                        key={path}
                        to={path}
                        end
                        className={({ isActive }) => `${isActive ? 'underline underline-offset-4' : ''} flex items-center space-x-4`}
                        onClick={label === 'Logout' ? handleLogout : closeSidebar}
                    >
                        <Icon size={16} />
                        <span>{label}</span>
                    </NavLink>
                ))}

                {/* <NavLink to="#" className=" bg-red-600 mt-4">
                    {adminToken ? (
                        <button
                            className="flex justify-center items-center gap-4"
                            onClick={handleLogout}
                        >
                            Logout  <FaSignOutAlt />
                        </button>
                    ) : (
                        <button className="flex justify-center items-center gap-4">
                            <IoMdLogIn className='text-xl' /> Log in
                        </button>
                    )}
                </NavLink> */}
            </nav>
        </div>
    );
});

export default AdminSidebar;