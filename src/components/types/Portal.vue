<template>
  <div>
    <h4>Portal {{ path }}</h4>
    <Participants :participants="participants" />
    <p>{{ config.name }}</p>
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
  watch: {
    participants: {
      immediate: true,
      deep: true,
      handler(newValue) {
        this.$store.commit("UPDATE_PORTAL", {
          participants: newValue,
          name: this.config.name,
          path: this.path,
        });
      },
    },
  },
  beforeDestroy() {
    if (this.participants.length) {
      this.$store.commit("CLOSE_PORTAL", {
        name: this.config.name,
        path: this.path,
      });
    }
  },
};
</script>

<style scoped></style>
