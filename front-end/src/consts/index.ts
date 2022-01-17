import { Feedback, CampaignFeedback, FeedbackExtended } from 'types'

export const backendURL =
  process.env.NODE_ENV === 'development'
    ? 'https://telefonicatesting.pythonanywhere.com/'
    : window.location.origin + '/'

export const LOCAL_STORAGE = {
  TOKEN: 'token',
  IS_ADMIN: 'is_admin',
  TEST_MODE: 'test-mode',
  DARK_MODE: 'dark-mode',
  ADVANCED_MODE: 'advanced-mode',
  REGISTERED_TERRITORIES: 'registered-territories',
  TRANSLATION_WANTED: 'translation-wanted',
}

export const labels = (
  shouldTranslate: boolean,
  translations: Record<string, string>
): Record<FeedbackExtended, string> =>
  !shouldTranslate
    ? {
        [Feedback.UNANSWERED]: 'No en casa',
        [Feedback.ANSWERED]: 'Atendió',
        [Feedback.NON_EXISTENT]: 'No existe',
        [Feedback.NO_CALL]: 'No visitar',
        [Feedback.ANSWERING_MACHINE]: 'Contestador',
        [Feedback.POSTPONE]: 'Aplazar',
        [Feedback.IGNORE]: 'Ignorar',
        [CampaignFeedback.RUSHED]: 'Completado',
      }
    : {
        [Feedback.UNANSWERED]: translations?.['d5'],
        [Feedback.ANSWERED]: translations?.['d4'],
        [Feedback.NON_EXISTENT]: translations?.['e1'],
        [Feedback.NO_CALL]: translations?.['d9'],
        [Feedback.ANSWERING_MACHINE]: translations?.['d6'],
        [Feedback.POSTPONE]: translations?.['d7'],
        [Feedback.IGNORE]: translations?.['d8'],
        [CampaignFeedback.RUSHED]: translations?.['e7'],
      }
