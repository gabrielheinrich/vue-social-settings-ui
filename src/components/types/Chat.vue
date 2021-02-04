<template>
  <div>
    <h4>Chat {{ path }}</h4>
    <Participants :participants="participants" />
    <p>Channel: {{ config.channel }}</p>
  </div>
</template>

<script>
export default {
  props: {
    config: {
      type: Object,
      required: true,
    },
    path: {
      type: String,
      required: true,
    },
    participants: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped></style>
