export default {
  user: {},

  loading: false,

  alertInfo: {
    text: '',
    type: 'success'
  }, 

  dialogVisible: false,
  loginStatus: localStorage.getItem('_TOKEN'),

  theme: localStorage.getItem('theme') || 'light'
}