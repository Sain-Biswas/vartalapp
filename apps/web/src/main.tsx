import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <div className="text-2xl font-bold text-red-600">code</div>
  </StrictMode>
);
