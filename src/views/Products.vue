<template>
    <NewProduct/>
</template>

<script>
import NewProduct from '@/components/NewProduct.vue'
import { mapState } from 'vuex'
import { mapActions } from 'vuex'

export default {
  name: 'Products',
  components: {
    NewProduct
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
