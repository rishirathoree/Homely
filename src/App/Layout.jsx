import React, { useState } from "react";
import ParentRoutes from "./WebApp/ParentRoutes";
import AdminPageRoutes from "./AdminApp/AdminPageRoutes";
import { useSelector } from "react-redux";
const Layout = () => {
  const Auth = useSelector((state) => state.Authenticate.IsAuth.data?.User);
  return (
    <>
      {Auth && Auth?.role === "admin" ? <AdminPageRoutes /> : <ParentRoutes />}
    </>
  );
};

export default Layout;
