function initialState() {
    return {
      entry: {
        id: null,
        name: '',
      },
      loading: false
    }
  }
    
  const getters = {
    entry: state => state.entry,
    lists: state => state.lists,
    loading: state => state.loading
  }
  
  const actions = {
    storeData({ commit, state, dispatch }) {
      commit('setLoading', true)
      dispatch('Alert/resetState', null, { root: true })
    },
    updateData({ commit, state, dispatch }) {
      commit('setLoading', true)
      dispatch('Alert/resetState', null, { root: true })
    },
    setName({ commit }, value) {
      commit('setName', value)
    },
    fetchCreateData({ commit }) {
        commit('setLists', '')
    },
    fetchEditData({ commit, dispatch }, id) {
        commit('setEntry', '')
        commit('setLists', '')
    },
    fetchShowData({ commit, dispatch }, id) {
        commit('setEntry', '')
    },
    resetState({ commit }) {
      commit('resetState')
    }
  }
  
  const mutations = {
    setEntry(state, entry) {
      state.entry = entry
    },
    setName(state, value) {
      state.entry.name = value
    },
    setLoading(state, loading) {
      state.loading = loading
    },
    resetState(state) {
      state = Object.assign(state, initialState())
    }
  }
  
  export default {
    namespaced: true,
    state: initialState,
    getters,
    actions,
    mutations
  }