import Vue from "vue";
import App from "./APP.vue";
import "./assets/styles/global.styl";

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");
