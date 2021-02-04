import Vue from "vue";
import App from "./App.vue";
import Vuex from "vuex";
import SocialSettingEditor from "@/components/SocialSettingEditor.vue";
import SocialSettingView from "@/components/SocialSettingView.vue";
import Participants from "@/components/Participants.vue";
import createPersistedState from "vuex-persistedstate";
Vue.use(Vuex);

const store = new Vuex.Store({
  plugins: [
    createPersistedState({
      paths: ["socialSettingStore", "template", "participants"],
    }),
  ],
  state: {
    participants: ["A", "B", "C"],
    socialSettingStore: {},
    template: { type: "empty" },
    portals: {},
  },
  mutations: {
    STORE_SOCIAL_SETTING(state, { path, data }) {
      Vue.set(state.socialSettingStore, path, data);
    },
    SET_TEMPLATE(state, template) {
      state.template = template;
    },
    REMOVE_PARTICIPANT(state, participant) {
      state.participants.splice(
        state.participants.findIndex((p) => p == participant),
        1
      );
    },
    ADD_PARTICIPANT(state, participant) {
      state.participants.push(participant);
    },
    UPDATE_PORTAL(state, { participants, name, path }) {
      if (!state.portals[name]) {
        Vue.set(state.portals, name, {});
      }
      Vue.set(state.portals[name], path, participants);
    },
    CLOSE_PORTAL(state, { name, path }) {
      Vue.delete(state.portals[name], path);
      if (Object.keys(state.portals[name]).length == 0) {
        Vue.delete(state.portals, name);
      }
    },
  },
});

Vue.config.productionTip = false;
Vue.component("SocialSettingEditor", SocialSettingEditor);
Vue.component("SocialSettingView", SocialSettingView);
Vue.component("Participants", Participants);

new Vue({
  store,
  render: (h) => h(App),
}).$mount("#app");
