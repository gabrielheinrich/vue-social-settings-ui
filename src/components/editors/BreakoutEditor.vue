<template>
  <div>
    <div>
      Group Size
      <select name="" id="" v-model.number="config.groupSize">
        <option v-for="n in 8" :key="n" :value="n">
          {{ n }}
        </option></select
      >
    </div>
    <SocialSettingEditor v-model="config.room" />
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
      config: {},
    };
  },
  watch: {
    value: {
      immediate: true,
      deep: true,
      handler(newValue) {
        if (!newValue.groupSize || !newValue.room) {
          this.config = { groupSize: 1, room: { type: "empty" }, ...newValue };
        } else {
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
