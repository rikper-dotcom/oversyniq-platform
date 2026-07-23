import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import "./index.css";

import { router } from "./router";
import { LanguageProvider } from "./context/LanguageContext";
import { StoreProvider } from "./store/StoreProvider";

ReactDOM.createRoot(
  document.getElementById("root")!
).render(
  <React.StrictMode>
    <StoreProvider>
      <LanguageProvider>
        <RouterProvider router={router} />
      </LanguageProvider>
    </StoreProvider>
  </React.StrictMode>
);