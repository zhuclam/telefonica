export const backendURL =
  process.env.NODE_ENV === 'development'
    ? 'https://telefonicatesting.pythonanywhere.com/'
    : '/'

export const LOCAL_STORAGE = {
  TOKEN: 'token',
  IS_ADMIN: 'is_admin',
}
