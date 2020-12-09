import { useCallback, useMemo, useState } from "react";
import {
  NameState,
  ReturnedNameState,
  AlertOptions,
  AlertProviderInterface,
} from "./types";

const emptyState: ReturnedNameState = {
  timeout: 0,
  data: null,
  show: false,
  permanent: false,
};

export const useAlertInner = (): AlertProviderInterface => {
  const [state, setState] = useState<Record<string, NameState | undefined>>({});

  const showHandler = useCallback((name: string, opts?: AlertOptions) => {
    const { timeout = 4000, data, permanent = false } = opts || {};
    setState((state) => ({
      ...state,
      [name]: {
        timeout: timeout || 0,
        data: data || null,
        permanent,
      },
    }));
  }, []);

  const hideHandler = useCallback((name: string) => {
    setState((state) => ({
      ...state,
      [name]: undefined,
    }));
  }, []);

  const hideAllHandler = useCallback(() => {
    setState({});
  }, []);

  const getByName = useCallback(
    (name: string): ReturnedNameState => ({
      show: true,
      ...(state[name] || emptyState),
    }),
    [state]
  );

  const AlertManager = useMemo(
    () => ({
      show: showHandler,
      hide: hideHandler,
      hideAll: hideAllHandler,
    }),
    [showHandler, hideHandler, hideAllHandler]
  );

  return {
    AlertManager,
    getByName,
  };
};
