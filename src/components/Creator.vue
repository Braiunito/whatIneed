<template>
  <div>
    <div class="md-layout">
      <div class="md-layout-item">
        <md-field>
          <label for="item">Item</label>
          <md-select v-model="productId" name="product" id="product">
            <md-option v-for="product in products" :key="product._id" :value="product._id">{{product.name}}</md-option>
          </md-select>
        </md-field>
      </div>

      <div class="md-layout-item">
        <md-field>
          <label for="item">Prioridad</label>
          <!-- Here I manage in a wrong way the structure of the priritys -->
          <md-select v-model="priority" name="priority" id="priority">
            <md-option value="Alta">Alta</md-option>
            <md-option value="Media Alta">Media Alta</md-option>
            <md-option value="Media">Media</md-option>
            <md-option value="Media Baja">Media Baja</md-option>
            <md-option value="Baja">Baja</md-option>
          </md-select>
        </md-field>
      </div>

      <div class="md-layout-item">
        <md-field>
          <label for="amount">Cantidad</label>
          <md-select v-model="amount" name="amount" id="amount">
            <md-option value="1">1</md-option>
            <md-option value="2">2</md-option>
            <md-option value="3">3</md-option>
            <md-option value="4">4</md-option>
            <md-option value="5">5</md-option>
            <md-option value="6">6</md-option>
            <md-option value="7">7</md-option>
            <md-option value="8">8</md-option>
            <md-option value="9">9</md-option>
            <md-option value="10">10</md-option>
            <md-option value="+10">+10</md-option>
            <md-option value="Pack">Pack</md-option>
            <md-option value="Packx2">Packx2</md-option>
            <md-option value="Packx4">Packx4</md-option>
            <md-option value="Packx5">Packx5</md-option>
          </md-select>
        </md-field>
      </div>
    </div>

    <md-button class="md-primary md-raised" id="addButton" @click="add()">Add item</md-button>
    <p>{{errors}}</p>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import {mapActions } from 'vuex'

  export default {
    name: 'BasicSelect',
    props: {
        products: Array
    },
    data: () => ({
      errors: null,
      productId: null,
      priority: null,
      amount: null
    }),
    methods: {
        ...mapMutations([
            'CREATE_NEW_ITEM',
        ]),
        ...mapActions([
            'addItem',
        ]),
        add() {
            let payload = {
                codproduct: this.productId,
                amount: this.amount,
                priority: this.priority
            }
            this.addItem(payload).then(()=>{
              document.getElementById('addButton').style = 'background-color: green';
              this.$socket.emit('eventAdd', payload);
              setTimeout(() => {
                document.getElementById('addButton').style = 'background-color: #448aff';
              }, 800);
            }).catch((err)=>{
              this.errors = err.response.data[0].text
              document.getElementById('addButton').style = 'background-color: red';
              setTimeout(() => {
                this.errors = null;
                document.getElementById('addButton').style = 'background-color: #448aff';
              }, 1500);
            });
        }
    }
  }
</script>