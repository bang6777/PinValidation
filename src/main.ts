import { createApp } from "vue";
import App from "./App.vue";
import "vue3-toastify/dist/index.css";
import "assets/styles/main.scss";
import Vue3Toastify, { type ToastContainerOptions } from "vue3-toastify";

const app = createApp(App);
app.use(Vue3Toastify, {
  autoClose: 3000,
} as ToastContainerOptions);

app.mount("#app");
