import data from './data.json'

const set = key => (state, val) => {
    state[key] = val
  }
  const that = this;
  function getDefaultState() {
    return {
      data: [],
      warehouses: [],
      singleItem: {},
      total: 0,
      loading: false,
    }
  }
  
  const getters = {
    data: state => state.data,
    warehouses: state => state.warehouses,
    singleItem: state => state.singleItem,
    total: state => state.total,
    loading: state => state.loading,
  }
  
  const actions = {
    fetchIndexData({ commit, state }) {
        commit('setData', []);
        commit('setLoading', true)
        setTimeout(function(){
            commit('setData', data.data),
            commit('setDataWarehouses', data.warehouses),
            commit('setTotal', data.data.length),
            commit('setLoading', false);
        },2000);
    },
    fetchItemProduct({ commit, state },id) {
      commit('setLoading', true)
      setTimeout(function(){
         var item = data.data[id];
         console.log(item);
          commit('setDataItem', item),
          commit('setLoading', false);
      },0);
  },
    deleteItemProduct({commit,state}, key){
        console.log(key);
        commit('setLoading', true)
        setTimeout(function(){
          data.data.splice(key, 1); // 2nd parameter means remove one item only
          commit('setLoading', false);
        },2000);
    },
    updateProducts({commit,state}, item){
        commit('setLoading', true)
        setTimeout(function(){
          data.data[item.id].warehouse = item.warehouse;
          data.data[item.id].catygory = item.catygory;
          data.data[item.id].unit = item.unit;
          data.data[item.id].expiry_date = item.expiry_date;
          data.data[item.id].quantity = item.quantity;
          data.data[item.id].note = item.note; 
          commit('setLoading', false);
        },2000);
    },
    createProducts({commit,state}, item){
      console.log(item);
      commit('setLoading', true)
        setTimeout(function(){
          data.data.push(item);
            commit('setLoading', false);
        },2000);
    },
    resetState({ commit }) {
        commit('resetState')
    }
  }
  
  const mutations = {
    setData: set('data'),
    setDataItem: set('singleItem'),
    setDataWarehouses: set('warehouses'),
    setTotal: set('total'),
    setLoading: set('loading'),
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
  