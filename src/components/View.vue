<template>
  <div class="view">
    View
    <slot :participants="participants" />
  </div>
</template>

<script>
export default {
  props: {
    participants: { type: Array, required: true },
  },
};
</script>

<style scoped>
.view {
  border: 1px solid green;
  margin: 0.25rem;
  padding: 0.25rem;
}
</style>
