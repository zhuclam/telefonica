import { keyframes } from "styled-components";

export const fadeIn = () => keyframes`
  from { opacity: 0 }
  to { opacity: 1 }
`;

export const fadeOut = () => keyframes`
  from { opacity: 1 }
  to { opacity: 0 }
`;

export const popUp = (isDesktop = false) => keyframes`
  from { opacity: 1; transform: translateY(0) }
  to { opacity: 1; transform: translateY(calc(${
    isDesktop ? "-100% - 10px" : "-100%"
  })) }
`;

export const popDown = (isDesktop = false) => keyframes`
  from { opacity: 1; transform: translateY(calc(${
    isDesktop ? "-100% - 10px" : "-100%"
  })) }
  to { opacity: 1; transform: translateY(0) }
`;

export const popUpCentered = (isDesktop = false) => keyframes`
  from { opacity: 1; transform: translate(-50%, 0) }
  to { opacity: 1; transform: translate(-50%, calc(${
    isDesktop ? "-100% - 10px" : "-100%"
  })) }
`;

export const popDownCentered = (isDesktop = false) => keyframes`
  from { opacity: 1; transform: translate(-50%, calc(${
    isDesktop ? "-100% - 10px" : "-100%"
  })) }
  to { opacity: 1; transform: translate(-50%, 0) }
`;

export const customEnterAnimation = keyframes`
  0% { transform: translateY(calc(-100% + 40px)) translateX(-50%) }
  70% { transform: translateY(calc(-500%)) translateX(-50%) }
  100% { transform: translateY(calc(-300%)) translateX(-50%) }
`;

export const customExitAnimation = keyframes`
  0% { transform: translateY(calc(-300%)) translateX(-50%); }
  30% { transform: translateY(calc(-500%)) translateX(-50%); }
  100% { transform: translateY(calc(-100% + 40px)) translateX(-50%); }
`;
