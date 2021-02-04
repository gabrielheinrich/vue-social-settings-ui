<template>
  <div>
    <div>Name: <input type="text" v-model="config.name" /></div>
  </div>
</template>

<script>
import Vue from "vue";
export default {
  props: {
    value: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      config: null,
    };
  },
  watch: {
    value: {
      immediate: true,
      deep: true,
      handler(newValue) {
        if (!newValue.name) {
          Vue.set(newValue, name, "");
        }
        this.config = newValue;
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

<style scoped>
.children {
  display: flex;
}
</style>
