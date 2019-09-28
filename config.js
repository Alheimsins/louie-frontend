module.exports = {
  apiUrl: process.env.VUE_APP_LOUIE_API_URL || 'https://api.louie.alheimsins.net/api',
  companyName: process.env.VUE_APP_LOUIE_COMPANY_NAME || 'Alheimsins School of Awesomeness',
  colors: {
    primary: process.env.VUE_APP_LOUIE_COLOR_PRIMARY || '#a2ddcf',
    background: process.env.VUE_APP_LOUIE_COLOR_BACKGROUND || '#f7f7f7',
    secondary: process.env.VUE_APP_LOUIE_COLOR_SECONDARY || '#F47F97',
    accent: process.env.VUE_APP_LOUIE_COLOR_ACCENT || '#6ac4ae',
    error: process.env.VUE_APP_LOUIE_COLOR_ERROR || '#e30438',
    info: process.env.VUE_APP_LOUIE_COLOR_INFO || '#00b1c7',
    success: process.env.VUE_APP_LOUIE_COLOR_SUCCESS || '#4CAF50',
    warning: process.env.VUE_APP_LOUIE_COLOR_WARNING || '#FFC107'
  }
}
