import { createApp } from 'vue'

import './assets/main.css'
import App from './App.vue'
import store from './store'
import { router } from './router'
// Plugins
import axios from 'axios';
import { abilitiesPlugin } from '@casl/vue'
import ability from './services/ability.js'
import VueSweetalert2 from 'vue-sweetalert2'
import MaterialSpinner from './components/MaterialSpinner.vue'
import VueButtonSpinner from './components/VueButtonSpinner.vue'
import BootstrapAlert from './components/BootstrapAlert.vue'
import BackButton from './components/BackButton.vue'
import DatetimePicker from './components/DatetimePicker.vue'
import VueRadio from './components/VueRadio.vue'

axios.defaults.headers.common['Accept'] = "application/json"
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
axios.defaults.headers.common['Content-Type'] = 'multipart/form-data'

axios.interceptors.response.use(
  function (response) {
    return response
  },
  function (error) {
    return Promise.reject(error)
  }
)

const app = createApp(App)

app.use(router)
app.use(store)
app.use(abilitiesPlugin, ability)
app.use(VueSweetalert2)
app.component('datetime-picker', DatetimePicker)
app.component('back-button', BackButton)
app.component('material-spinner', MaterialSpinner)
app.component('vue-button-spinner', VueButtonSpinner)
app.component('bootstrap-alert', BootstrapAlert)
app.component('v-radio', VueRadio)
app.mount('#app')
