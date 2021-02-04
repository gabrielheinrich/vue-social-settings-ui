<template>
  <div class="social-setting">
    <div class="ui">
      <div v-for="participant in participants" :key="participant">
        {{ participant }}
      </div>
      <button @click="next">next</button>
    </div>
    <div class="children">
      <GridView :participants="participantsFor(0)">
        <template slot-scope="{ participants }">
          <Tool :participants="participants" name="chat" />
          <Tool :participants="participants" name="videoconf" />
        </template>
      </GridView>
      <GridView :participants="participantsFor(1)">
        <template slot-scope="{ participants }">
          <Tool :participants="participants" name="slides" />
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
      activeSession: 0,
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
.children {
  display: flex;
}
</style>
