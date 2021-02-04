<template>
  <div>
    <h4>Empty {{ path }}</h4>
    <Participants :participants="participants" />
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
