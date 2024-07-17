import React, { useState } from "react";
import { SoftwareContext } from "../SoftwareContext";
export const SoftwareContextProvider = ({
  children,
}: React.PropsWithChildren<object>) => {
  const [nome_software, setNome_software] = useState("");
  return (
    <SoftwareContext.Provider
      value={{
        nome_software,
        setNome_software,
      }}
    >
      {children}
    </SoftwareContext.Provider>
  );
};
