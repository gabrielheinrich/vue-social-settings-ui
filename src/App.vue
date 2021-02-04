<template>
  <div id="app">
    <SocialSettingEditor v-model="config" />
    <div>
      <button @click="removeParticipant">-</button
      ><button @click="addParticipant">+</button>
      <participants :participants="participants" />
    </div>
    <SocialSettingView
      :config="template"
      :participants="participants"
      path="root"
    />
  </div>
</template>

<script>
import SocialSettingEditor from "@/components/SocialSettingEditor.vue";
import SocialSettingView from "./components/SocialSettingView.vue";

export default {
  name: "App",
  data() {
    return {
      config: { type: "empty" },
    };
  },
  components: {
    SocialSettingEditor,
    SocialSettingView,
  },
  methods: {
    addParticipant() {
      const lastParticipant = this.participants[this.participants.length - 1];
      if (!lastParticipant) {
        this.$store.commit("ADD_PARTICIPANT", "A");
      } else {
        this.$store.commit(
          "ADD_PARTICIPANT",
          String.fromCharCode(lastParticipant.charCodeAt(0) + 1)
        );
      }
    },
    removeParticipant() {
      const lastParticipant = this.participants[this.participants.length - 1];
      if (lastParticipant) {
        this.$store.commit("REMOVE_PARTICIPANT", lastParticipant);
      }
    },
  },
  computed: {
    participants() {
      return this.$store.state.participants;
    },
    template() {
      return this.$store.state.template;
    },
  },
  watch: {
    config: {
      deep: true,
      handler(newValue) {
        this.$store.commit("SET_TEMPLATE", newValue);
      },
    },
    template: {
      immediate: true,
      handler(newValue) {
        this.config = newValue;
      },
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

* {
  margin: 0;
  padding: 0;
}

button {
  padding: 0.25em 1em;
}
</style>
