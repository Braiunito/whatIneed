<template>
  <div class="home">
    <Searcher/>
    <md-button id="FSButton" v-if="!fullScreenMode" class="md-primary md-raised" @click="FullScreen()">
        Go full screen!
    </md-button>
    <ItemList class="itemList" :items="(searching) ? results : items"/>
  </div>
</template>

<script>
import ItemList from '@/components/ItemList.vue'
import Searcher from '@/components/Searcher.vue'
import { mapState } from 'vuex'
import { mapActions } from 'vuex'
export default {
  name: 'Home',
  components: {
    ItemList,
    Searcher
  },
  methods: {
      FullScreen(){
        document.body.requestFullscreen();
      },
      ...mapActions([
        'fetchProducts', 
        'fetchItems', 
      ])
  },
  sockets: {
        connect: function () {
            console.log('Socket connected')
        },
        Deleted: function (data) {
            console.log('Elemento eliminado por algun usuario, id del producto: ', data);
            this.fetchItems();
        },
        Duplicated: function (data) {
            console.log('Elemento duplicado por algun usuario, id del producto: ', data);
            this.fetchItems();
        },
        Add: function (data) {
            console.log('Elemento agregado por algun usuario, item agregado: ', data);
            this.fetchItems();
        },
  },
  computed: mapState([
    'fullScreenMode',
    'searching',
    'results',
    'items',
    'host'
  ]),
  mounted() {
    let context = this;
    document.addEventListener('fullscreenchange', function (){
      if (document.fullscreenElement) {
        context.$store.commit('CHANGE_FULLSCREEN_MODE', true)
      } else {
        context.$store.commit('CHANGE_FULLSCREEN_MODE', false)
      }
    });
    this.fetchItems();
    this.fetchProducts();
  },
}
</script>

<style>
:fullscreen{
  background-color: white;
  overflow: auto;
}

@media (max-width: 559px){
  .itemList {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  } 
}
@media (min-width: 559px){
  #FSButton {
    display: none;
  }
}
</style>