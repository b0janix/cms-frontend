<template>
<fieldset style="display: flex; flex-flow: row; justify-content: space-around; margin-bottom: 20px" >
  <div>
    <div style="margin-bottom: 10px">
      <label class="label" for="limit"><small>Set the limit of posts</small></label>
      <input type="number" id="limit" name="limit" min="1" v-model="limit" style="width: 30%"/>
    </div>
  </div>
  <div>
    <div style="margin-bottom: 10px;">
      <label class="label" for="with_comments"><small>With comments</small></label>
      <input type="checkbox" id="with_comments" name="with_comment" @change="withComments"/>
    </div>
    <div style="float: left" v-if="with_comments">
      <label class="label" for="comment"><small>Search by comment</small></label>
      <input type="text" id="comment" name="comment" v-model="comment" style="width: 30%"/>
    </div>
  </div>
  <div>
    <div style="margin-bottom: 10px">
      <label class="label" for="sort_by"><small>Sort by</small></label>
      <select name="sort_by" id="sort_by" v-model="sort_by">
        <option value=""></option>
        <option value="id">ID</option>
        <option value="topic">Topic</option>
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
  <div v-if="post_ids.length > 0" >
    <div style="margin-bottom: 10px">
      <label for="ids" class="label"><small>Available ids:</small></label>
      <span id="ids"><small>{{ post_ids.join(" ") }}</small></span>
    </div>
    <div style="float: left">
      <label for="id" class="label"><small>Filter by id</small></label>
      <input type="number" id="id" name="id" style="width: 30%" v-model="id" />
    </div>
  </div>
</fieldset>
<input type="button" id="getPosts" value="Get Posts" @click.prevent="getPosts"/>
</template>

<script>
export default {
  name: "Filters",
  props: ['post_ids'],
  data() {
    return {
      sort_by: '',
      direction: '',
      with_comments: false,
      comment: '',
      id: '',
      limit: '',
      params: '',
    }
  },
  emits: ['getThePosts'],
  methods: {
     withComments(e) {
       this.with_comments = e.target.checked
       if (!e.target.checked) {
         document.querySelector('#comment').value = '';
       }
    },
    getPosts()
    {
      this.params='';
      if (this.sort_by.length > 0 || this.with_comments || this.comment.length > 0 || this.id !== '' || this.limit !== '') {
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

        if (this.with_comments) {
          if (this.params !== '?') {
            this.params += '&'
          }
          this.params += 'with=comments';
          if (this.comment.length > 0) {
            if (this.params !== '?') {
              this.params += '&'
            }
            this.params += `comment=${this.comment}`;
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

      this.$emit('getThePosts', this.params)
    }
  }
}
</script>

<style scoped>
 .label {
   margin-right: 10px;
 }
 #getPosts {
   background-color: darkslategrey;
   color: #ffffff;
 }
</style>