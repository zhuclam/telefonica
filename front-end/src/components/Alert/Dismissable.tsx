import {
  FunctionComponent,
  ReactElement,
  useCallback,
  cloneElement,
  useContext,
} from 'react'
import { AlertContext } from './Provider'

interface DismissableProps {
  children: ReactElement
}

interface InnerDismissableProps extends DismissableProps {
  name: string
}

export const Dismissable: FunctionComponent<DismissableProps> = () => null

export const InnerDismissable: FunctionComponent<InnerDismissableProps> = ({
  name,
  children,
}) => {
  const { AlertManager } = useContext(AlertContext)

  const dismiss = useCallback(() => AlertManager.hide(name), [
    name,
    AlertManager,
  ])

  return cloneElement(children, { onClick: dismiss })
}
