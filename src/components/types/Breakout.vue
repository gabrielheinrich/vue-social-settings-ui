<template>
  <div>
    <h4>Breakout {{ path }}</h4>
    <Participants :participants="participants" />
    <SocialSettingView
      v-for="(group, index) in groups"
      :key="index"
      :config="config.room"
      :participants="group"
      :path="path + '/room:' + index"
    >
    </SocialSettingView>
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
  computed: {
    groups() {
      const groupSize = this.config.groupSize || 1;

      const groups = Array(Math.ceil(this.participants.length / groupSize))
        .fill(0)
        .map(() => []);

      let participantIndex = 0;

      for (let group = 0; group < groups.length; ++group) {
        for (let i = 0; i < groupSize; ++i) {
          groups[group].push(this.participants[participantIndex]);
          participantIndex += 1;
        }
      }
      return groups;
    },
  },
};
</script>

<style scoped></style>
