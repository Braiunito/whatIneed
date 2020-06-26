<template>
  <div class="home">
        <div class="priorities">
            <md-button v-for="priority in priorities" 
                :key="priority._id" 
                class="md-primary md-raised"
                @click="ORDER_BY_PRIORITY(priority.priority)">
                {{priority.priority}}
            </md-button>
        </div>
      <hr>
    <ItemList class="itemList" :items="results"/>
  </div>
</template>

<script>
import ItemList from '@/components/ItemList.vue'
import { mapState } from 'vuex'
import { mapActions } from 'vuex'
import { mapMutations } from 'vuex'

export default {
  name: 'Home',
  components: {
    ItemList,
  },
  data:()=>({
    priorities: null
  }),
  methods: {
    ...mapMutations([
        'ORDER_BY_PRIORITY'
    ]),
    ...mapActions([
        'fetchProducts', 
        'fetchItems', 
        'prority', 
    ])
  },
  sockets: {
        connect: function () {
            console.log('socket connected')
        },
        Deleted: function (data) {
            console.log('Elemento eliminado por algun usuario, id del producto: ', data);
            this.fetchItems();
        },
        Add: function (data) {
            console.log('Elemento agregado por algun usuario, item agregado: ', data);
            this.fetchItems();
        },
  },
  computed: { 
    ...mapState([
        'results'
    ])
  },
  mounted() {
    this.fetchItems().then(()=>{
        let filtered = []
        this.priorities = this.$store.state.items
        this.priorities = this.priorities.filter((element)=>{
            if (!filtered.includes(element.priority)) {
                filtered.push(element.priority);
                return true   
            }
        });

        this.ORDER_BY_PRIORITY(filtered[0])
    });
  },
}
</script>

<style scoped>
.priorities{
    padding-left: 10px;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row-reverse;
    justify-content: flex-end;
}
</style>
