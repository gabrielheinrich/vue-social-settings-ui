<template>
  <div class="editor">
    <select @change="resetType" :value="config.type">
      <option value="empty">Empty</option>
      <option value="chat">Chat</option>
      <option value="linear">Linear</option>
      <option value="free-choice">Free Choice</option>
      <option value="breakout">Breakout</option>
      <option value="portal">Portal</option>
      <option value="portal-exit">Portal Exit</option>
    </select>
    <component :is="editorComponent" v-model="config" />
  </div>
</template>

<script>
import ChatEditor from "@/components/editors/ChatEditor.vue";
import EmptyEditor from "@/components/editors/EmptyEditor.vue";
import LinearEditor from "@/components/editors/LinearEditor.vue";
import FreeChoiceEditor from "@/components/editors/FreeChoiceEditor.vue";
import BreakoutEditor from "@/components/editors/BreakoutEditor.vue";
import PortalEditor from "@/components/editors/PortalEditor.vue";
import PortalExitEditor from "@/components/editors/PortalExitEditor.vue";

const routes = {
  chat: "ChatEditor",
  empty: "EmptyEditor",
  linear: "LinearEditor",
  "free-choice": "FreeChoiceEditor",
  breakout: "BreakoutEditor",
  portal: "PortalEditor",
  "portal-exit": "PortalExitEditor",
};
export default {
  components: {
    EmptyEditor,
    ChatEditor,
    LinearEditor,
    FreeChoiceEditor,
    BreakoutEditor,
    PortalEditor,
    PortalExitEditor,
  },
  name: "SocialSettingEditor",
  data() {
    return {
      config: { type: "empty" },
    };
  },
  props: {
    value: {
      type: Object,
    },
  },
  watch: {
    config: {
      immediate: true,
      deep: true,
      handler(newValue) {
        this.$emit("input", newValue);
      },
    },
    value: {
      immediate: true,
      handler() {
        if (this.value && this.value.type) {
          this.config = this.value;
        }
      },
    },
  },
  methods: {
    resetType(event) {
      const type = event.target.value;
      this.config = {
        type,
      };
    },
  },
  computed: {
    editorComponent() {
      return routes[this.config.type];
    },
    types() {
      return Object.keys(routes);
    },
  },
};
</script>

<style scoped>
.editor {
  border: 1px solid black;
  padding: 0.25rem;
  margin: 0.25rem;
}
</style>
