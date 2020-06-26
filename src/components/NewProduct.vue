<template>
  <div class="md-layout">
    <md-field>
    <label>Nombre</label>
      <md-input v-model="name" aria-placeholder="Nombre">Nombre</md-input>
    </md-field>

    <md-autocomplete v-model="category" :md-options="categoryComplete" md-dense>
      <label>Categoria</label>
    </md-autocomplete>
    
    <md-autocomplete v-model="description" :md-options="descriptionComplete">
      <label>Descripcion</label>
    </md-autocomplete>
    <md-button class="md-primary md-raised" id="addButton" @click="add()">Create product</md-button>
    <p>{{errors}}</p>
  </div>
</template>
<script>
import {mapActions} from 'vuex';
  export default {
    name: 'AutocompleteStatic',
    data: () => ({
      name: null,
      category: null,
      description: null,
      descriptionComplete: [],
      categoryComplete: [],
      errors: null
    }),
    methods: {
        add(){
            let payload = {
                 name: this.name, 
                 category: this.category, 
                 description: this.description
            }
            this.addProduct(payload).then(()=>{
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
        },
        ...mapActions([
        'fetchProducts',
        'addProduct',
        ])
  },
    mounted() {
        this.fetchProducts().then(()=>{
            let products = this.$store.getters.allProducts;
            products.forEach(element => {
                if (this.descriptionComplete.indexOf(element.description)) 
                    this.descriptionComplete.push(element.description)
                if (this.categoryComplete.indexOf(element.category)) 
                    this.categoryComplete.push(element.category)
            });
        });
    },
  }
</script>