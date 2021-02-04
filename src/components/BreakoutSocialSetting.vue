<template>
  <div class="social-setting">
    <div class="ui">
      <div v-for="participant in participants" :key="participant">
        {{ participant }}
      </div>
      <button @click="split = !split">share/split</button>
    </div>
    <div class="children">
      <GridView :participants="split ? [] : participants">
        <template slot-scope="{ participants }">
          <Tool :participants="participants" name="share" />
        </template>
      </GridView>
      <GridView
        :participants="(split ? [participants[n - 1]] : []) || []"
        v-for="n in participants.length || 1"
        :key="n"
      >
        <template slot-scope="{ participants }">
          <LinearSocialSetting :participants="participants" name="split" />
        </template>
      </GridView>
    </div>
  </div>
</template>

<script>
import Tool from "@/components/Tool.vue";
import GridView from "@/components/View.vue";
import LinearSocialSetting from "@/components/LinearSocialSetting.vue";

export default {
  props: {
    participants: {
      type: Array,
      required: true,
    },
  },
  components: {
    Tool,
    GridView,
    LinearSocialSetting,
  },
  data() {
    return {
      split: true,
    };
  },
  methods: {
    next() {
      this.activeSession = (this.activeSession + 1) % 2;
    },
    participantDestination() {
      return this.activeSession;
    },
  },
  computed: {
    participantsFor() {
      return (session) => {
        return this.participants.filter(
          (participant) => this.participantDestination(participant) == session
        );
      };
    },
  },
};
</script>

<style scoped>
.social-setting {
  display: flex;
  padding: 0.5rem;
  border: 1px solid black;
  align-items: center;
}
</style>
