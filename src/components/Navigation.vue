<template>
<div style="margin-top: 20px">
  <input
      v-for="link in links"
      :key="link.label"
      type="button"
      class="nav_button"
      :value="link.label"
      :class="link.active ? 'nav_active_button' : 'nav_button'"
      @click="navigate"
  />
</div>
</template>

<script>
export default {
  name: "Navigation",
  props: ['links'],
  emits: ['navigate'],
  methods: {
    navigate(e) {
      let link = this.links.find((link) => link.label === e.target.value);
      this.$emit('navigate', link.url);
    }
  }
}
</script>

<style scoped>
.nav_button {
  background-color: darkslategrey;
  color: #ffffff;
}
.nav_active_button {
  background-color: #7f97ad;
  color: #2c3e50;
}
</style>