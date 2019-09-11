module.exports = {
  apiUrl: process.env.LOUIE_API_URL || 'https://api.louie.alheimsins.net/api',
  primary: process.env.LOUIE_COLOR_PRIMARY || '#a2ddcf',
  background: process.env.LOUIE_COLOR_BACKGROUND || '#f7f7f7',
  secondary: process.env.LOUIE_COLOR_SECONDARY || '#F47F97',
  accent: process.env.LOUIE_COLOR_ACCENT || '#6ac4ae',
  error: process.env.LOUIE_COLOR_ERROR || '#e30438',
  info: process.env.LOUIE_COLOR_INFO || '#00b1c7',
  success: process.env.LOUIE_COLOR_SUCCESS || '#4CAF50',
  warning: process.env.LOUIE_COLOR_WARNING || '#FFC107'
}
