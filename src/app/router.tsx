// router.tsx
import React from "react";
import {
  Navigate,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import FactoryLayout from "../layout/layout";

const FactoryWrapper: React.FC = () => {
  const userName = localStorage.getItem("userName");
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const role = localStorage.getItem("role");
  console.log("FactoryWrapper", { isLoggedIn, userName, role, path: window.location.pathname });
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return <FactoryLayout />;
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route
        path="login"
        lazy={() =>
          import("./modules/login/index").then((mod) => ({
            Component: mod.Component,
          }))
        }
      />

      <Route
        path="/"
        element={
          <React.Suspense fallback={<div>Loading...</div>}>
            <FactoryWrapper />
          </React.Suspense>
        }
      >
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route
          path="dashboard"
          lazy={() =>
            import("./modules/dashboard/index").then((mod) => ({
              Component: mod.Component,
            }))
          }
        />
        <Route
          path="employee-List"
          lazy={() =>
            import("./modules/employee_list/index").then((mod) => ({
              Component: mod.Component,
            }))
          }
        />
      </Route>

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Route>
  ),
  {
    basename: "/Employee",
  }
);

export default router;
