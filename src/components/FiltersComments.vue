<template>
<fieldset style="display: flex; flex-flow: row; justify-content: space-around; margin-bottom: 20px" >
  <div>
    <div style="margin-bottom: 10px">
      <label class="label" for="limit"><small>Set the limit of comments</small></label>
      <input type="number" id="limit" name="limit" min="1" v-model="limit" style="width: 30%"/>
    </div>
  </div>
  <div>
    <div style="margin-bottom: 10px">
      <label class="label" for="sort_by"><small>Sort by</small></label>
      <select name="sort_by" id="sort_by" v-model="sort_by">
        <option value=""></option>
        <option value="id">ID</option>
        <option value="content">Content</option>
        <option value="abbreviation">Abbreviation</option>
        <option value="created_at">Created At</option>
        <option value="updated_at">Updated At</option>
      </select>
    </div>
    <div style="float: left" v-if="sort_by.length > 0">
      <label class="label" for="sort_by"><small>Direction</small></label>
      <select name="direction" id="direction" v-model="direction">
        <option value="asc">ASC</option>
        <option value="desc">DESC</option>
      </select>
    </div>
  </div>
  <div v-if="comment_ids.length > 0" >
    <div style="margin-bottom: 10px">
      <label for="ids" class="label"><small>First 10 ids:</small></label>
      <p id="ids"><small>{{ comment_ids.join(" ") }}</small></p>
    </div>
    <div style="float: left">
      <label for="id" class="label"><small>Filter by id</small></label>
      <input type="number" id="id" name="id" style="width: 30%" v-model="id" />
    </div>
  </div>
</fieldset>
<input type="button" id="getComments" value="Get Comments" @click.prevent="getComments"/>
</template>

<script>
export default {
  name: "Filters",
  props: ['comment_ids'],
  emits: ['getTheComments'],
  data() {
    return {
      sort_by: '',
      direction: '',
      id: '',
      limit: '',
      params: '',
    }
  },

  methods: {
    getComments()
    {
      this.params='';
      if (this.sort_by.length > 0 || this.id !== '' || this.limit !== '') {
        this.params += '?';
        if (this.sort_by.length > 0) {
          this.params += `sort=${this.sort_by}`;
          if (this.direction.length > 0) {
            if (this.params !== '?') {
              this.params += '&'
            }
            this.params += `direction=${this.direction}`;
          }
        }
        if (this.id !== '') {
          if (this.params !== '?') {
            this.params += '&'
          }
          this.params += `id=${this.id}`;
        }

        if (this.limit !== '') {
          if (this.params !== '?') {
            this.params += '&'
          }
          this.params += `limit=${this.limit}`;
        }
      }

      this.$emit('getTheComments', this.params)
    }
  }
}
</script>

<style scoped>
 .label {
   margin-right: 10px;
 }
 #getComments {
   background-color: darkslategrey;
   color: #ffffff;
 }
</style>