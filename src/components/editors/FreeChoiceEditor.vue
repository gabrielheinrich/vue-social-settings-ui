<template>
  <div>
    <button @click="removeLastChoice">-</button>
    <button @click="addEmptyChoice">+</button>
    <div class="children">
      <SocialSettingEditor
        v-for="(choice, index) in config.choices"
        :key="index"
        v-model="config.choices[index]"
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
  data() {
    return {
      config: null,
    };
  },
  methods: {
    addEmptyChoice() {
      this.config.choices.push({ type: "empty" });
    },
    removeLastChoice() {
      this.config.choices.splice(this.config.choices.length - 1, 1);
    },
  },
  watch: {
    value: {
      immediate: true,
      deep: true,
      handler(newValue) {
        if (!newValue.choices) {
          this.config = { choices: [], ...newValue };
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
  flex-direction: column;
}
</style>
