<template>
  <div class="social-setting-view">
    <component
      :is="component"
      :participants="participants"
      :path="path"
      :config="config"
    />
  </div>
</template>

<script>
import Chat from "@/components/types/Chat.vue";
import Empty from "@/components/types/Empty.vue";
import FreeChoice from "@/components/types/FreeChoice.vue";
import Linear from "@/components/types/Linear.vue";
import Breakout from "@/components/types/Breakout.vue";
import Portal from "@/components/types/Portal.vue";
import PortalExit from "@/components/types/PortalExit.vue";

const routes = {
  chat: "Chat",
  empty: "Empty",
  "free-choice": "FreeChoice",
  linear: "Linear",
  breakout: "Breakout",
  portal: "Portal",
  "portal-exit": "PortalExit",
};

export default {
  components: {
    Chat,
    Empty,
    FreeChoice,
    Linear,
    Breakout,
    Portal,
    PortalExit,
  },
  props: {
    participants: {
      type: Array,
      required: true,
    },
    path: {
      type: String,
      required: true,
    },
    config: {
      type: Object,
      default: () => ({ type: "empty" }),
    },
  },
  computed: {
    component() {
      return routes[this.config.type];
    },
  },
};
</script>

<style scoped>
.social-setting-view {
  padding: 0.25rem;
  margin: 0.25rem;
  border: 1px solid black;
}
</style>
