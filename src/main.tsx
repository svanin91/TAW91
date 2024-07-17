import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { LoggedContextProvider } from "./context/provider/LoggedProvider.tsx";
import { UtenteProvider } from "./context/provider/UtenteProvider.tsx";
import { SoftwareContextProvider } from "./context/provider/SoftwareProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <LoggedContextProvider>
      <UtenteProvider>
        <SoftwareContextProvider>
          <App />
        </SoftwareContextProvider>
      </UtenteProvider>
    </LoggedContextProvider>
  </React.StrictMode>
);
