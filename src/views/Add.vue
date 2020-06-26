<template>
    <Creator :products="products"/>
</template>

<script>
import Creator from '@/components/Creator.vue'
import { mapState } from 'vuex'
import { mapActions } from 'vuex'

export default {
  name: 'Add',
  components: {
    Creator
  },
  methods: {
    ...mapActions([
      'fetchProducts', 
      'fetchItems', 
    ])
  },
  mounted() {
    this.fetchItems();
    this.fetchProducts();
  },
  computed: mapState([
    'products'
  ])
}
</script>
