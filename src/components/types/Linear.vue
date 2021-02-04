<template>
  <div>
    <h4>Linear {{ path }}</h4>
    <Participants :participants="participants" />
    <div>
      <button @click="next">Next</button>
    </div>
    <div class="children">
      <SocialSettingView
        v-for="(phase, index) in config.phases"
        :key="index"
        :config="phase"
        :path="path + '/' + index"
        :participants="participantsFor(index)"
      >
      </SocialSettingView>
    </div>
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
  methods: {
    next() {
      if (!this.config.phases.length) return;
      const activePhase = (this.activePhase + 1) % this.config.phases.length;
      this.$store.commit("STORE_SOCIAL_SETTING", {
        path: this.path,
        data: { activePhase },
      });
    },
    ensureActivePhaseValid() {
      if (
        this.activePhase == null ||
        (this.activePhase && this.activePhase >= this.config.phases.length)
      ) {
        this.$store.commit("STORE_SOCIAL_SETTING", {
          path: this.path,
          data: { activePhase: 0 },
        });
      }
    },
  },
  computed: {
    participantsFor() {
      return (session) => {
        if (session == this.activePhase) {
          return this.participants;
        } else return [];
      };
    },
    activePhase() {
      const state = this.$store.state.socialSettingStore[this.path];
      if (!state) return 0;
      return state.activePhase;
    },
  },
  watch: {
    activePhase: {
      immediate: true,
      handler() {
        this.ensureActivePhaseValid();
      },
    },
    "config.phases": {
      immediate: true,
      deep: true,
      handler() {
        this.ensureActivePhaseValid();
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
