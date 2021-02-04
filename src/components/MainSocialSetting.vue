<template>
  <div class="social-setting">
    <div class="ui">
      <div v-for="participant in participants" :key="participant">
        {{ participant }}
      </div>
      <button @click="prev">prev</button>
      <button @click="next">next</button>
    </div>
    <div class="children">
      <GridView :participants="participantsFor(0)">
        <template slot-scope="{ participants }">
          <Tool :participants="participants" name="intro" />
          <Tool :participants="participants" name="onboarding" />
        </template>
      </GridView>
      <GridView :participants="participantsFor(1)">
        <template slot-scope="{ participants }">
          <Tool :participants="participants" name="chat" />
          <LinearSocialSetting :participants="participants" />
        </template>
      </GridView>
      <GridView :participants="participantsFor(2)">
        <template slot-scope="{ participants }">
          <BreakoutSocialSetting :participants="participants" />
        </template>
      </GridView>
      <GridView :participants="participantsFor(3)">
        <template slot-scope="{ participants }">
          <ChoiceSocialSetting :participants="participants" />
        </template>
      </GridView>
    </div>
  </div>
</template>

<script>
import Tool from "@/components/Tool.vue";
import GridView from "@/components/View.vue";
import LinearSocialSetting from "@/components/LinearSocialSetting.vue";
import BreakoutSocialSetting from "@/components/BreakoutSocialSetting.vue";
import ChoiceSocialSetting from "@/components/ChoiceSocialSetting.vue";

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
    BreakoutSocialSetting,
    ChoiceSocialSetting,
  },
  data() {
    return {
      activeSession: 0,
      numSessions: 4,
    };
  },
  methods: {
    next() {
      this.activeSession = (this.activeSession + 1) % this.numSessions;
    },
    prev() {
      this.activeSession =
        (this.activeSession + this.numSessions - 1) % this.numSessions;
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
.children {
  display: flex;
}
</style>
