import { createStore } from 'vuex'

import Alert from './modules/alert.module.js'
import InvoicesIndex from './cruds/Invoices/index.module.js'
import ProductsIndex from './cruds/Products/index.module.js'

export default createStore({
  modules: {
    Alert,
    InvoicesIndex,
    ProductsIndex,
  }
});