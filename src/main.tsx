import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";
import { App } from "./App.tsx";
import store from "./store/index.ts";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={store}>
    <App />
  </Provider>
);
