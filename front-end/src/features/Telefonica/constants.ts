import { Feedback } from 'types'

export const colors = {
  0: 'danger',
  1: 'success',
  2: 'dark',
  3: 'warning',
  4: 'primary',
  5: 'info',
  6: 'secondary',
}

export const labels: Record<Feedback, string> = {
  [Feedback.UNANSWERED]: 'No en casa',
  [Feedback.ANSWERED]: 'Atendió',
  [Feedback.NON_EXISTENT]: 'No existe',
  [Feedback.NO_CALL]: 'No visitar',
  [Feedback.ANSWERING_MACHINE]: 'Contestador',
  [Feedback.POSTPONE]: 'Aplazar',
  [Feedback.IGNORE]: 'Ignorar',
}
