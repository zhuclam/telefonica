import { useContext } from "react";
import { AlertContext } from "./Provider";

export const useAlerts = () => {
  const { AlertManager } = useContext(AlertContext);

  return { AlertManager };
};
