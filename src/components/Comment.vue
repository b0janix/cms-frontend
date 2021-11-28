<template>
  <div class="post" :id="id">
    <small>{{ content }}</small>
  </div>
</template>

<script>
export default {
  name: "Comment",
  props: ['content', 'id']
}
</script>

<style scoped>

</style>