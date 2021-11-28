<template>
  <FiltersComments :comment_ids="comment_ids" @getTheComments.="getTheComments"></FiltersComments>
  <div v-if="comments.length > 0">
    <ul class="comments-list">
      <li class="comment-item" v-for="comment in comments" :key="comment.id">
        <Comment :content="comment.content" :id="comment.id"></Comment>
        <hr>
      </li>
    </ul>
  </div>
  <Navigation :links="links" @navigate="navigate"></Navigation>
</template>

<script>
import Comment from "../components/Comment";
import FiltersComments from "../components/FiltersComments";
import Navigation from "../components/Navigation";
import axios from "axios";

export default {
  name: 'Comments',
  components: {Comment, FiltersComments, Navigation},
  data() {
    return {
      comments: [
      ],
      url: 'http://localhost:8080/api/comments',
      comment_ids: [],
      links: [],
      params: ''
    }
  },
  methods: {
    async getTheComments(params) {
      try {
        this.url = 'http://localhost:8080/api/comments';
        if (params.trim().length > 0) {
          this.url += params;
          this.params = params;
        }
        const response = await axios.get(this.url);
        this.comments = response.data.result.data;
        this.links = response.data.result.links;
        this.links.splice(0,1);
        this.links.splice((this.links.length - 1),1);
        this.comment_ids = [];
        if (this.comments.length > 0) {
          this.comment_ids.push('');
          let chosenComments = this.comments.slice(0, 10);
          chosenComments.forEach((comment) => {
            this.comment_ids.push(comment.id);
          });
        }
      } catch (error) {
        console.error(error);
      }
    },
    async navigate(url) {
      console.log(this.params);
      if (this.params.trim().length > 0) {
        if (this.params.indexOf('?') === 0) {
          this.params = '&' + this.params.slice(1);
        }
        url += this.params;
      }
      const response = await axios.get(url);
      this.comments = response.data.result.data;
      this.links = response.data.result.links;
      this.links.splice(0,1);
      this.links.splice((this.links.length - 1),1);
      this.comment_ids = [];
      if (this.comments.length > 0) {
        this.comment_ids.push('');
        let chosenComments = this.comments.slice(0, 10);
        chosenComments.forEach((comment) => {
          this.comment_ids.push(comment.id);
        });
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .comments-list {
    list-style-type: none;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
  }
</style>
