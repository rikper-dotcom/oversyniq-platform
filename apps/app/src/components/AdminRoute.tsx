import type {
  ReactNode,
} from "react";

import {
  Navigate,
} from "react-router-dom";

import pb from "../services/pocketbase";

type AdminRouteProps = {
  children: ReactNode;
};

function AdminRoute({
  children,
}: AdminRouteProps) {
  const user =
    pb.authStore.record;

  if (
    !pb.authStore.isValid
  ) {
    return (
      <Navigate
        to="/staff/login"
        replace
      />
    );
  }

  if (
    user?.role !== "admin"
  ) {
    return (
      <Navigate
        to="/dashboard"
        replace
      />
    );
  }

  return children;
}

export default AdminRoute;
