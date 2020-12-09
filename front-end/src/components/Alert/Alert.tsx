import React, {
  FunctionComponent,
  useLayoutEffect,
  useState,
  useContext,
  Children,
  isValidElement,
  ReactElement,
} from 'react'
import ReactDOM from 'react-dom'
import styled, { css, Keyframes } from 'styled-components'
import { AlertContext } from './Provider'
import { fadeIn, fadeOut } from './animations'
import { AllowedPositions } from './types'
import { getPositionalCSS } from './utils'
import { InnerDismissable, Dismissable } from './Dismissable'

interface AlertProps {
  name: string
  onClose?: () => void
  enterAnimation?: Keyframes | 'none'
  exitAnimation?: Keyframes | 'none'
  animationDuration?: number
  animationTimingFunction?: (show: boolean) => string
  noStyle?: boolean
  containerCSS?: ReturnType<typeof css>
  position?: AllowedPositions
  id?: string
  onClick?: () => void
}

export const Alert: FunctionComponent<AlertProps> = ({
  name,
  onClose,
  enterAnimation,
  exitAnimation,
  animationDuration = 0.3,
  animationTimingFunction = () => 'linear',
  noStyle = false,
  children,
  containerCSS,
  position,
  id,
  onClick,
}) => {
  const { getByName, AlertManager } = useContext(AlertContext)
  const { show, timeout, data, permanent } = getByName(name)

  const [isShowing, setIsShowing] = useState(false)
  const [storedData, setStoredData] = useState<any>(null)

  const waitAnimation = () =>
    new Promise((r) => setTimeout(r, animationDuration * 1000))

  const handleHide = () => {
    const doHide = () => {
      setIsShowing(false)
      setStoredData(null)
      onClose?.()
    }
    if (exitAnimation !== 'none') waitAnimation().then(doHide)
    else doHide()
  }

  useLayoutEffect(() => {
    if (show) {
      setIsShowing(true)
      data && setStoredData(data)
      !permanent && setTimeout(() => AlertManager.hide(name), timeout)
    } else if (isShowing) {
      handleHide()
    }
  }, [show])

  if (!isShowing) return null

  const processedChildren = (typeof children === 'function'
    ? children(storedData)
    : children) as ReactElement | ReactElement[] | string

  const Snack = (
    <Container
      id={id || name}
      noStyle={noStyle}
      animation={show ? enterAnimation || fadeIn() : exitAnimation || fadeOut()}
      animationDuration={animationDuration}
      animationTimingFunction={animationTimingFunction(show)}
      show={show}
      containerCSS={containerCSS}
      position={position}
      onClick={onClick}
      role="alert"
    >
      {Children.map(processedChildren, (child) => {
        if (!child) return child

        // @ts-ignore
        if (isValidElement(child) && child.type.name === Dismissable.name) {
          return (
            <InnerDismissable name={name}>
              <span>{child.props.children}</span>
            </InnerDismissable>
          )
        }
        return child
      })}
    </Container>
  )

  if (position)
    return ReactDOM.createPortal(Snack, document.querySelector('body')!)

  return Snack
}

const Container = styled.div<{
  animation: Keyframes | 'none'
  noStyle: boolean
  animationDuration: number
  show: boolean
  containerCSS?: ReturnType<typeof css>
  animationTimingFunction: string
  position?: AllowedPositions
  onClick?: () => void
}>`
  ${({
    noStyle,
    animation,
    animationDuration,
    show,
    containerCSS,
    animationTimingFunction,
    position,
    onClick,
  }) => {
    const animationProps = css`
      animation: ${animation} ${animationDuration}s ${animationTimingFunction};
      opacity: ${show ? 1 : 0};
    `
    return noStyle
      ? css`
          ${animationProps}
          ${containerCSS}
          ${getPositionalCSS(position, show, animationDuration)}
        `
      : css`
          box-sizing: border-box;
          border-radius: 4px;
          background-color: #333;
          color: #eee;
          padding: 15px 20px;
          width: fit-content;
          display: inline-block;
          cursor: ${onClick ? 'pointer' : 'initial'};
          ${animationProps}
          ${containerCSS}
          ${getPositionalCSS(position, show, animationDuration)}
        `
  }}
`
