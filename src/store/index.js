import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
import axios from 'axios';
import axiosRetry from 'axios-retry';

// Retry when we have a inconsitence in the data
axiosRetry(axios, { retries: 3 });

// Exponential back-off retry delay between requests
axiosRetry(axios, { retryDelay: axiosRetry.exponentialDelay});
 
export default new Vuex.Store({
  state: {
    fullScreenMode: false,
    host: 'http://localhost:3003',
    loading: 'NotLoading',
    searching: false,
    results: [],
    items: [],
    products: []
  },
  mutations: {
    CHANGE_FULLSCREEN_MODE(state, status){
      state.fullScreenMode = status;
    },
    ORDER_BY_PRIORITY(state, status){
      let priority = state.items.filter(item => item.priority === status);
      state.results = priority;
    },
    FILTER_TO_SEARCH(state, status){
      state.results = status;
    },
    SET_SEARCHING_STATUS(state, status){
      state.searching = status;
    },
    SET_LOADING_STATUS(state, status){
      state.loading = status
    },
    POPULATE_ITEMS(state, status){
      if (status.response == false) {
        state.items = []
      }
      else {
        state.items = status
      } 
    },
    POPULATE_PRODUCTS(state, status){
      state.products = status
    },
    CREATE_NEW_ITEM(state, item){
      state.items.push(item)
    },
    DELETE_A_ITEM(state, id){
      state.items.splice(state.items.indexOf(id), 1);
    }
  },
  actions: {
    searchItems(context, params){
      let results = context.state.items.filter(element => {
        let data = element.details.name.toLocaleLowerCase();
        return data.includes(params.toLocaleLowerCase());
      });
      context.commit('FILTER_TO_SEARCH', results);
      context.commit('SET_SEARCHING_STATUS', true);
    },
    fetchProducts(context) {
      return axios.get(`${context.state.host}/products/get-all`)
          .then(response => response.data)
          .then(products => context.commit('POPULATE_PRODUCTS', products));
    },
    fetchItems(context) {
      return axios.get(`${context.state.host}/items/get-all`)
          .then(response => response.data)
          .then(items => context.commit('POPULATE_ITEMS', items))
          .catch(err => {
            console.log('Retrying, INCONSISTENCE: ',err);
          });
    },
    addItem(context, params) {
      return axios.post(`${context.state.host}/items/new-item`, params);
    },
    addProduct(context, params) {
      return axios.post(`${context.state.host}/products/new-product`, params);
    },
    deleteItem(context, id) {
      return axios.delete(`${context.state.host}/items/delete-item/${id}`)
    },
  },
  getters: {
    allProducts: (state) =>  {
      return state.products
    },
    searchResult: (state) => {
      return state.results
    },
  },
  modules: {
  }
})
