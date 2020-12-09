export interface AlertOptions {
  timeout?: number;
  data?: unknown;
  permanent?: boolean;
}

export interface NameState {
  data?: unknown;
  timeout: number;
  permanent: boolean;
}

export interface ReturnedNameState extends NameState {
  show: boolean;
}

export interface AlertProviderInterface {
  AlertManager: {
    show: (name: string, opts?: AlertOptions) => void;
    hide: (name: string) => void;
    hideAll: () => void;
  };
  getByName: (name: string) => ReturnedNameState;
}

export type AllowedPositions =
  | "top"
  | "bottom"
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right";
