const theme = (darkMode: boolean) => ({
  navbarHeight: 56,
  text: {
    colors: {
      secondary: darkMode ? 'blue' : '#999',
      error: '#ff5e5e',
    },
  },
})

export { theme }
