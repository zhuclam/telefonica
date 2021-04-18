type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

const sizes: Record<Size, string> = {
  xs: '0px',
  sm: '500px',
  md: '960px',
  lg: '1150px',
  xl: '1920px',
}

const theme = (darkMode: boolean) => ({
  darkMode,
  navbarHeight: 56,
  text: {
    colors: {
      secondary: '#999',
      error: '#ff5e5e',
      green: '#28a745',
      blue: '#2000d4',
      black: '#222',
      white: '#fff',
      lightgreen: 'lightgreen',
      info: '#007bff',
      red: '#dc3545',
      yellow: 'gold',
      lightblue: 'lightblue',
    },
  },
  breakpoints: {
    up: (size: Size): string => `@media (min-width: ${sizes[size]})`,
    down: (size: Size): string => `@media (max-width: ${sizes[size]})`,
    between: (from: Size, to: Size): string =>
      `@media (min-width: ${sizes[from]}) and (max-width: ${sizes[to]})`,
  },
})

export type Theme = ReturnType<typeof theme>

export { theme }
