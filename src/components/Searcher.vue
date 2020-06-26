<template>
    <md-card>
      <md-field>
        <label>Buscador</label>
        <md-input v-model="result" v-on:input="search()"></md-input>
      </md-field>
    </md-card>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    name: 'Searcher',
    data: ()=>({
        result: null
    }),
    methods: {
        ...mapActions([
            'searchItems'
        ]),
        search(){
            if (this.result.length > 0) {
                this.searchItems(this.result);
            } else {
                this.$store.commit('SET_SEARCHING_STATUS', false);
            }
        }
    }
}    
</script>