<template>
<div class="post" :id="id">
  <h3>{{ topic }}</h3>
</div>
</template>

<script>
export default {
  name: "Post",
  props: ['topic', 'id']
}
</script>

<style scoped>

</style>