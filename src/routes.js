import React from "react";
import { Navigate } from "react-router-dom";
import DashboardLayout from "src/layouts";
// import Dashboard from "src/views/dashboard";
import NotFoundView from "src/views/errors/NotFoundView";
import Login from "./views/auth/Login";
import { State } from "./views/state";
import Signup from "./views/auth/Signup";
import ForgetPassword from "./views/auth/ForgetPassword";
import ResetPasswordSuccess from "./views/auth/ResetPasswordSuccess";

import FarmerSurvey from "./views/farmerSurvey";
import FarmerView from "./views/farmerSurvey/view";
import Catalogue from "./views/catalogue";
import CatalogueView from "./views/catalogue/view";
import Loan from "./views/loan";
import LoanView from "./views/loan/view";
import Purchase from "./views/purchase";
import PurchaseView from "./views/purchase/view";
import Dashboard from "./views/dashboard";


const routes = [
  {
    path: "app",
    element: <DashboardLayout />,
    children: [
      { path: "dashboard", element: <Dashboard /> },
      { path: "farmer_survey", element: <FarmerSurvey /> },
      { path: "farmer_survey/view/:id", element: <FarmerView /> },

      { path: "loan", element: <Loan /> },
      { path: "loan/view/:id", element: <LoanView /> },

      { path: "catalogue", element: <Catalogue /> },
      { path: "catalogue/view/:id", element: <CatalogueView /> },

      { path: "purchase", element: <Purchase /> },
      { path: "purchase/view/:id", element: <PurchaseView /> },

      { path: "dashboard", element: <State /> },
      { path: "*", element: <Navigate to="/404" /> },

    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },
  { path: "/forgetpassword", element: <ForgetPassword /> },
  { path: "/forgetpassword/:token", element: <ResetPasswordSuccess /> },
  {
    path: "/",
    element: <DashboardLayout />,
    children: [
      { path: "404", element: <NotFoundView /> },
      { path: "/", element: <Navigate to="/app/farmer_survey" /> },
      { path: "*", element: <Navigate to="/404" /> },
    ],
  },
];
export default routes;
