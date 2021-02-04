<template>
  <div>
    <h4>Free Choice {{ path }}</h4>
    <div
      v-for="participant in participants"
      :key="participant"
      style="display: flex; margin-bottom: 0.5em"
    >
      {{ participant }}

      <button
        v-for="(choice, index) in config.choices"
        :key="index"
        @click="choose(participant, index)"
      >
        {{ index }}
      </button>
    </div>
    <div class="children">
      <SocialSettingView
        v-for="(choice, index) in config.choices"
        :key="index"
        :config="choice"
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
    participantDestination(participant) {
      const choice = this.storedParticipantChoices[participant];
      if (choice == null || choice >= this.config.choices.length) {
        return 0;
      }
      return choice;
    },
    choose(participant, track) {
      this.$store.commit("STORE_SOCIAL_SETTING", {
        path: this.path,
        data: {
          storedParticipantChoices: {
            ...this.storedParticipantChoices,
            [participant]: track,
          },
        },
      });
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
    storedParticipantChoices() {
      const state = this.$store.state.socialSettingStore[this.path];
      return state && state.storedParticipantChoices
        ? state.storedParticipantChoices
        : {};
    },
  },
};
</script>

<style scoped></style>
