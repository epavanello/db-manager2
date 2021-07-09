import "carbon-components-svelte/css/all.css";
import App from "$containers/App.svelte";

const app = new App({
  target: document.getElementById("app"),
});

export default app;
