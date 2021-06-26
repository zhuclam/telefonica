import { default as styled } from 'styled-components'
import type { ThemedStyledInterface } from 'styled-components'
import type { Theme } from 'theme'

export { css, keyframes, ThemeProvider } from 'styled-components'
export type { Keyframes } from 'styled-components'

export default styled as ThemedStyledInterface<Theme>
