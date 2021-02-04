<template>
  <div>
    <h4>Portal Exit {{ path }}</h4>
    <Participants :participants="participants" />
    <SocialSettingView
      :config="config.destination"
      :participants="allParticipants"
      :path="path + '/portal'"
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
    portalParticipants() {
      const portal = this.$store.state.portals[this.config.name];
      console.log(portal);
      if (!portal) return [];
      return Object.values(portal).reduce((result, participants) => {
        return [...result, ...participants];
      }, []);
    },
    allParticipants() {
      return [...this.participants, ...this.portalParticipants];
    },
  },
};
</script>

<style scoped></style>
