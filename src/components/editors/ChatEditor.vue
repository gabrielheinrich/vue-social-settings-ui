<template>
  <div>
    <input type="text" v-model="config.channel" />
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      config: { channel: "" },
    };
  },
  watch: {
    value: {
      immediate: true,
      deep: true,
      handler(newValue) {
        if (Object.keys(newValue).length) {
          this.config = newValue;
        }
      },
    },
    config: {
      immediate: true,
      deep: true,
      handler() {
        this.$emit("input", this.config);
      },
    },
  },
};
</script>

<style scoped></style>
