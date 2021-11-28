<template>
  <div id="login_container" style="margin-bottom: 10px">
    <div>
      <h3>Destroy token</h3>
      <input type="button" id="logout" value="Logout" @click.prevent="logout">
    </div>
    <div>
      <h3>Generate token</h3>
      <div style="margin-bottom: 10px">
        <input type="email" v-model="email" placeholder="email" onfocus="this.removeAttribute('readonly');" readonly/>
      </div>
      <div style="margin-bottom: 10px">
        <input type="password" v-model="password" placeholder="password" onfocus="this.removeAttribute('readonly');" readonly/>
      </div>
      <div>
        <input type="button" value="Submit" @click.prevent="login"/>
      </div>
    </div>
  </div>
  <div id="create_container">
    <h3>Create Comment</h3>
    <div style="margin-bottom: 10px">
      <label class="label" for="sort_by" style="margin-right: 8px"><small>Post ID</small></label>
      <select id="post_ids" v-if="post_ids.length > 0" v-model="post_id">
        <option v-for="post_id in post_ids" :key="post_id" :value="post_id">{{ post_id }}</option>
      </select>
    </div>
    <div style="margin-bottom: 10px">
      <input type="text" v-model="content" placeholder="Content" onfocus="this.removeAttribute('readonly');" readonly/>
    </div>
    <div style="margin-bottom: 10px">
      <input type="text" v-model="abbreviation" placeholder="Abbreviation" onfocus="this.removeAttribute('readonly');" readonly/>
    </div>
    <div>
      <input type="button" value="Create" @click.prevent="create"/>
    </div>
  </div>
  <div id="delete_container" style="margin-bottom: 10px">
    <h3>Delete Comment</h3>
    <div style="margin-bottom: 10px">
      <input type="number" placeholder="Comment ID" onfocus="this.removeAttribute('readonly');" readonly min="1" v-model="comment_id"/>
    </div>
    <div>
      <input type="button" value="Delete" @click.prevent="destroy">
    </div>
  </div>

</template>

<script>
import axios from "axios";

export default {
  name: "C&DComments",
  data() {
    return {
      token: '',
      email: '',
      password: '',
      content: '',
      abbreviation: '',
      post_id: '',
      comment_id: '',
      loginurl: 'http://localhost:8080/api/login',
      logouturl: 'http://localhost:8080/api/logout',
      cdurl: 'http://localhost:8080/api/comments',
      getpostsurl: 'http://localhost:8080/api/posts',
      post_ids: []
    }
  },
  methods:  {
    setToken(token) {
      localStorage.setItem('_token', token);
      this.token = localStorage.getItem('_token');
    },
    removeToken() {
      this.token = '';
      localStorage.removeItem('_token');
    },
    async logout() {
      try {
        await axios({
          method: 'post',
          url: this.logouturl,
          headers: {
            "Authorization": "Bearer " + this.token,
            "Content-type": "application/json"
          }
        });
        this.removeToken();
        alert("You've successfully logged out!");
      } catch (e) {
        alert(e.message);
      }

    },
    async login() {
      if (this.email.trim().length === 0 || this.password.trim().length === 0) {
        alert('Please provide the required credentials')
      }
      try {
        const response = await axios.post(this.loginurl, {
          email: this.email,
          password: this.password
        });
        this.setToken(response.data.access_token);
        alert("You've successfully logged in!")
      } catch (e) {
        alert(e.message);
      }
    },
    async getPosts() {
      try {
        const response = await axios.get(this.getpostsurl);
        this.posts = response.data.result.data;
        if (this.posts.length > 0) {
          this.post_ids.push('');
          this.posts.forEach((post) => {
            this.post_ids.push(post.id);
          });
        }
      } catch (error) {
        console.error(error);
      }
    },
    async create() {
      this.cdurl = 'http://localhost:8080/api/comments'
      try {
        await axios({
          method: 'post',
          url: this.cdurl,
          data: {
            post_id: this.post_id,
            content: this.content,
            abbreviation: this.abbreviation
          },
          headers: {
            "Authorization": "Bearer " + this.token,
            "Content-type": "application/json"
          }
        });
        alert("You've successfully created new comment!");
      } catch (e) {
        alert(e.message);
      }
    },
    async destroy() {
      try {
        this.cdurl = 'http://localhost:8080/api/comments'
        await axios({
          method: 'delete',
          url: this.cdurl + '/' + this.comment_id,
          headers: {
            "Authorization": "Bearer " + this.token,
            "Content-type": "application/json"
          }
        });
        alert("You've successfully deleted comment!");
      } catch (e) {
        alert(e.message);
      }
    }
  },
  mounted() {
    this.token = localStorage.getItem('_token');
    this.getPosts();
  }
}
</script>

<style scoped>

</style>