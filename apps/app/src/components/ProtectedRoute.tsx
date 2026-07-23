import type {
  ReactNode,
} from "react";

import {
  Navigate,
} from "react-router-dom";

import pb from "../services/pocketbase";

type ProtectedRouteProps = {
  children: ReactNode;
};

function ProtectedRoute({
  children,
}: ProtectedRouteProps) {
  if (!pb.authStore.isValid) {
    return (
      <Navigate
        to="/staff/login"
        replace
      />
    );
  }

  return children;
}

export default ProtectedRoute;
