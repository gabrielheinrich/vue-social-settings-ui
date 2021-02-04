<template>
  <div class="tool">
    <strong>{{ name }}</strong>
    <div v-for="participant in participants" :key="participant">
      {{ participant }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      default: "Tool",
    },
    participants: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped>
.tool {
  border: 1px solid blue;
  margin: 0.25rem;
  padding: 0.25rem;
}
</style>
