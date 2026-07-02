import Layout from "../pages/Layout";
import { Dashboard } from "../pages/Dashboard";
import { Routes, Route } from "react-router-dom";
import Loginpage from "../pages/loginPage/Loginpage";

import PublicRoute from "./public";
import PrivateRoute from "./private";
import ForgotPassword from "../pages/loginPage/Forgot_password_page";
import ResetPassword from "../pages/admin_operation_Page/Reset_password_page";
import Admin_operation from "../pages/admin_operation_Page/Admin_operation";
import Add_admin from "../pages/admin_operation_Page/Add_admin";
import Edit_Admin from "../pages/admin_operation_Page/Edit_Admin";
import Employee_Operation_Page from "../pages/employee_operation_Page/employee_operation_page";
import Add_employee from "../pages/employee_operation_Page/Add_employee";
import Edit_employee from "../pages/employee_operation_Page/edit_employee";
import View_employee from "../pages/employee_operation_Page/view_employee";


const Approutes = () => {
  return (
    <Routes>
      <Route element={<PublicRoute />}>
        <Route path="/" element={<Loginpage />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/resetpassword/:token" element={<ResetPassword />} />
      </Route>

      <Route element={<PrivateRoute />}>
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin-operation" element={<Admin_operation />} />

          <Route path="/admin-operation/add-admin" element={<Add_admin />} />
          <Route path="/admin-operation/edit-admin/:emailId" element={<Edit_Admin/>}/>
          <Route path="/employee-operation" element={<Employee_Operation_Page/>} />
          <Route path="/employee-operation/add-employee" element={<Add_employee/>} />
          <Route path="/employee-operation/edit-employee/:id" element={<Edit_employee/>} />
          <Route path="/employee-operation/view/:id" element={<View_employee/>} />
        </Route>
      </Route>
    </Routes>
  );
};
export default Approutes;
