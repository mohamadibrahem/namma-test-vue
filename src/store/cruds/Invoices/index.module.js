import invoices from './data.json'

const set = key => (state, val) => {
    state[key] = val
  }
  const that = this;
  function getDefaultState() {
    return {
      data: [],
      total: 0,
      loading: false,
      serialNumber: 0
    }
  }
  
  const getters = {
    data: state => state.data,
    total: state => state.total,
    loading: state => state.loading,
    serialNumber: state => state.serialNumber,
  }
  
  const actions = {
    fetchIndexData({ commit, state }) {
        commit('setData', []);
        commit('setLoading', true)
        setTimeout(function(){
            commit('setData', invoices.data),
            commit('setTotal', invoices.data.length),
            commit('setLoading', false);
        },2000);
    },
    filterInvoces({commit,state}, data){
      console.log(data.invoice_number + ' - ' +data.invoice_date);
      commit('setLoading', true)
        setTimeout(function(){
            let filter = state.data.filter(item => item.invoice_number.includes(data.invoice_number) || item.invoice_date.includes(data.invoice_date));
            commit('setData', filter);
            commit('setTotal', filter.length);
            commit('setLoading', false);
        },2000);
    },
    getserialNumber({commit,state}){
      const lastItem = invoices.data[invoices.data.length - 1];
      var serial_number = parseInt(lastItem.invoice_number.match(/[+-]?\d+(\.\d+)?/g).join(''));
      serial_number = serial_number + 1; 
      serial_number = 'SR '+serial_number;
      commit('setSerialNumber', serial_number)
    },
    createInvoces({commit,state}, item){
      console.log(item);
      commit('setLoading', true)
        setTimeout(function(){
          invoices.data.push(item);
            commit('setLoading', false);
        },2000);
    },
    resetState({ commit }) {
        commit('resetState')
    }
  }
  
  const mutations = {
    setData: set('data'),
    setTotal: set('total'),
    setLoading: set('loading'),
    setSerialNumber: set('serialNumber'),
    resetState(state) {
      Object.assign(state, getDefaultState())
    }
  }
  
  export default {
    namespaced: true,
    state: getDefaultState,
    getters,
    actions,
    mutations
  }
  