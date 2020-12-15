type CustomTheme = import('../theme/theme').Theme

declare module 'styled-components' {
  export interface DefaultTheme extends CustomTheme {}
}
