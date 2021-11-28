<template>
  <Filters :post_ids="post_ids" @getThePosts="getThePosts"></Filters>
  <div v-if="posts.length > 0">
    <ul class="posts-list">
      <li v-for="post in posts" :key="post.id" class="post-item">
        <Post :topic="post.topic" :id="post.id"></Post>
        <ul class="comments-list" v-if="post.comments">
          <li v-for="comment in post.comments" :key="comment.id" class="comment-item">
            <Comment :content="comment.content" :id="comment.id"></Comment>
            <hr>
          </li>
        </ul>
      </li>
    </ul>

  </div>
</template>

<script>
const axios = require('axios');
import Post from "../components/Post";
import Comment from "../components/Comment";
import Filters from "../components/FiltersPosts";
export default {
  name: 'Posts',
  components: {Post, Comment, Filters},
  data() {
    return {
      posts: [],
      url: 'http://localhost:8080/api/posts',
      post_ids: []
    }
  },
  methods: {
    async getThePosts(params) {
      try {
        this.url = 'http://localhost:8080/api/posts';
        if (params.trim().length > 0) {
          this.url += params;
        }
        const response = await axios.get(this.url);
        this.posts = response.data.result.data;
        this.post_ids = [];
        if (this.posts.length > 0) {
          this.posts.forEach((post) => {
            this.post_ids.push(post.id);
          });
        }
      } catch (error) {
        console.error(error);
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 .posts-list {
   list-style-type: none;
   display: flex;
   flex-flow: column nowrap;
   align-items: center;
 }
 .comments-list {
   list-style-type: none;
   margin-right: 25px;
 }

 .post-item {
   width: 500px;
   height: 2%;
   color: #2c3e50;
   border: 1px solid #2c3e50;
   margin-bottom: 20px;
   border-radius: 5px;
   padding: 0 10px 10px 10px;
 }
</style>
