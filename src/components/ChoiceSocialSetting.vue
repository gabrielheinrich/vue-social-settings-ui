<template>
  <div class="social-setting">
    <div class="ui">
      <div
        v-for="participant in participants"
        :key="participant"
        style="display: flex; margin-bottom: 0.5em"
      >
        {{ participant }}
        <button @click="choose(participant, 0)">A</button>
        <button @click="choose(participant, 1)">B</button>
      </div>
    </div>
    <div class="children">
      <GridView :participants="participantsFor(0)">
        <template slot-scope="{ participants }">
          <Tool :participants="participants" name="track A" />
        </template>
      </GridView>
      <GridView :participants="participantsFor(1)">
        <template slot-scope="{ participants }">
          <Tool :participants="participants" name="track B" />
        </template>
      </GridView>
    </div>
  </div>
</template>

<script>
import Tool from "@/components/Tool.vue";
import GridView from "@/components/View.vue";

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
  },
  data() {
    return {
      participantChoices: {},
    };
  },
  watch: {
    participants: {
      immediate: true,
      handler() {
        this.participantChoices = {
          ...this.participants.reduce((result, participant) => {
            result[participant] = 0;
            return result;
          }, {}),
          ...this.participantChoices,
        };
      },
    },
  },
  methods: {
    participantDestination(participant) {
      return this.participantChoices[participant];
    },
    choose(participant, track) {
      this.participantChoices[participant] = track;
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
