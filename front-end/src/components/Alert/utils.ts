import { css } from 'styled-components'
import { AllowedPositions } from './types'
import { popUp, popDown, popUpCentered, popDownCentered } from './animations'

export const getPositionalCSS = (
  position: AllowedPositions | undefined,
  show: boolean,
  animationDuration: number
): ReturnType<typeof css> | string => {
  if (!position) return ''

  switch (position) {
    case 'top':
      return css`
        ${commonPositionalStyle}
        ${getDesktopScackbarAnimation('top-centered', show, animationDuration)}
        top: 10px;
        left: 50%;
        transform: translateX(-50%);
        ${getMobileSnackbarStyle('top', show, animationDuration)}
      `
    case 'top-left':
      return css`
        ${commonPositionalStyle}
        ${getDesktopScackbarAnimation('top', show, animationDuration)}
        top: 10px;
        left: 10px;
        ${getMobileSnackbarStyle('top', show, animationDuration)}
      `

    case 'top-right':
      return css`
        ${commonPositionalStyle}
        ${getDesktopScackbarAnimation('top', show, animationDuration)}
        top: 10px;
        right: 10px;
        ${getMobileSnackbarStyle('top', show, animationDuration)}
      `

    case 'bottom':
      return css`
        ${commonPositionalStyle}
        ${getDesktopScackbarAnimation(
          'bottom-centered',
          show,
          animationDuration
        )}
        top: 100vh;
        left: 50%;
        transform: translate(-50%, calc(-100% - 10px));
        ${getMobileSnackbarStyle('bottom', show, animationDuration)}
      `

    case 'bottom-left':
      return css`
        ${commonPositionalStyle}
        ${getDesktopScackbarAnimation('bottom', show, animationDuration)}
        top: 100vh;
        left: 10px;
        transform: translateY(calc(-100% - 10px));
        ${getMobileSnackbarStyle('bottom', show, animationDuration)}
      `

    case 'bottom-right':
      return css`
        ${commonPositionalStyle}
        ${getDesktopScackbarAnimation('bottom', show, animationDuration)}
        top: 100vh;
        right: 10px;
        transform: translateY(calc(-100% - 10px));
        ${getMobileSnackbarStyle('bottom', show, animationDuration)}
      `

    default:
      return ''
  }
}

const commonPositionalStyle = `
    position: fixed;
    z-index: 100000;
`

const getDesktopScackbarAnimation = (
  position: 'bottom' | 'top' | 'bottom-centered' | 'top-centered',
  show: boolean,
  animationDuration: number
) => {
  const [pd, pu] = position.endsWith('centered')
    ? [popDownCentered(true), popUpCentered(true)]
    : [popDown(true), popUp(true)]

  const [enter, exit] = position.startsWith('top') ? [pd, pu] : [pu, pd]

  return css`
    animation: ${show ? enter : exit} ${animationDuration}s
      ${show ? 'ease-out' : 'ease-in'};
  `
}

const getMobileSnackbarStyle = (
  position: 'bottom' | 'top',
  show: boolean,
  animationDuration: number
) => {
  const [enter, exit] =
    position === 'top' ? [popDown(), popUp()] : [popUp(), popDown()]

  return css`
    ${({ theme }) => theme.breakpoints.down('sm')} {
      width: 100vw;
      border-radius: 0;
      left: 0;
      right: 0;
      ${position === 'top' ? 'top: 0;' : ''}
      transform: ${position === 'bottom' ? 'translateY(-100%)' : 'none'};
      animation: ${show ? enter : exit} ${animationDuration}s
        ${show ? 'ease-out' : 'ease-in'};
    }
  `
}
