import React, { FunctionComponent, createContext } from "react";
import { AlertProviderInterface } from "./types";
import { useAlertInner } from "./useAlertInner";

export const AlertContext = createContext<AlertProviderInterface>(
  {} as AlertProviderInterface
);

export const AlertProvider: FunctionComponent = ({ children }) => {
  const alertValue = useAlertInner();

  return (
    <AlertContext.Provider value={alertValue}>{children}</AlertContext.Provider>
  );
};
