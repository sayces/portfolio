import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { AuthProvider } from "./shared/context/AuthContext.tsx";
import { BrowserRouter } from "react-router-dom";
import { ContentProvider } from "./shared/context/ContentContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <ContentProvider>
        <BrowserRouter basename="/portfolio/">
          <App />
        </BrowserRouter>
      </ContentProvider>
    </AuthProvider>
  </StrictMode>,
);
