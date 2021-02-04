<template>
  <div>
    <button @click="removeLastPhase">-</button>
    <button @click="addEmptyPhase">+</button>
    <div class="children">
      <SocialSettingEditor
        v-for="(phase, index) in config.phases"
        :key="index"
        v-model="config.phases[index]"
      >
      </SocialSettingEditor>
    </div>
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
  name: "LinearEditor",

  data() {
    return {
      config: null,
    };
  },
  methods: {
    addEmptyPhase() {
      this.config.phases.push({ type: "empty" });
    },
    removeLastPhase() {
      this.config.phases.splice(this.config.phases.length - 1, 1);
    },
  },
  watch: {
    value: {
      immediate: true,
      deep: true,
      handler(newValue) {
        if (!newValue.phases) {
          this.config = { phases: [], ...newValue };
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

<style scoped>
.children {
  display: flex;
}
</style>
