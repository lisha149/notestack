import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import AppRoutes from "./routes/Approutes";
import Provider from "./provider";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider>
      <AppRoutes />
    </Provider>
  </StrictMode>
);
