import { createRoot } from "react-dom/client";
import App from "./app/App.tsx";
import "./styles/index.css";

const rootEl = document.getElementById("root")!;

try {
  createRoot(rootEl).render(<App />);
} catch (e: any) {
  rootEl.innerHTML = `<pre style="color:red;padding:20px;white-space:pre-wrap">Render Error:\n${e?.stack || e?.message || e}</pre>`;
}

window.onerror = (msg, url, line, col, err) => {
  rootEl.innerHTML = `<pre style="color:red;padding:20px;white-space:pre-wrap">Runtime Error:\n${msg}\n@${url}:${line}:${col}\n${err?.stack || ""}</pre>`;
  return true;
};

window.onunhandledrejection = (e) => {
  rootEl.innerHTML = `<pre style="color:red;padding:20px;white-space:pre-wrap">Unhandled Promise Rejection:\n${e.reason?.stack || e.reason}</pre>`;
};
