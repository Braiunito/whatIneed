<template>
  <div>
    <md-card class="md-primary" v-for="item in items" :key="item._id">
      <md-card-header>
        <md-card-header-text>
          <div class="md-title">{{item.details.name}}</div>
          <div class="md-subhead">{{item.details.category}}</div>
          <div class="md-subhead">{{item.priority}}</div>
        </md-card-header-text>
        <md-card-content>
          Descripcion: {{item.details.description}} <br>
          Cantidad: {{item.amount}}  
        </md-card-content>
      </md-card-header>
      <md-card-actions>
        <md-button @click="duplicate(item)" id="buy">Duplicar</md-button>
        <md-button @click="del(item._id)" id="delete">Comprado</md-button>
      </md-card-actions>
    </md-card>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { mapActions } from 'vuex'

export default {
  name: 'ItemList',
  props: {
    items: Array
  },
  methods: {
    ...mapMutations([
      'CREATE_NEW_ITEM'
    ]),
    ...mapActions([
      'deleteItem',
      'addItem'
    ]),
    del(itemId){
      this.deleteItem(itemId).then(()=>{
        console.log('Calling to event deleted');
        itemId = 'Alta facha mi rey';
        this.$socket.client.emit('eventDeleted', itemId);
    });
    },
    duplicate(item){
      let payload = {
          codproduct: item.codproduct,
          amount: item.amount,
          priority: item.priority
      }
      this.addItem(payload).then(()=>{
        this.$socket.client.emit('eventDuplicated', payload.codproduct);
      });
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~vue-material/dist/theme/engine";
  @import "~vue-material/dist/base/theme";
  @import "~vue-material/dist/components/MdCard/theme";

  #delete, #buy {
    color: white;
    font-weight: bold;
  }
  #delete {
    background-color: rgba(247, 56, 56, 0.95);
  }
  #buy {
    background-color: rgba(39, 141, 29, 0.95);
  }

  .md-card {
    width: 320px;
    margin: 4px;
    display: inline-block;
    vertical-align: top;
  }
</style>
