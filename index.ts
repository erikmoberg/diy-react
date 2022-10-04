import { AppComponent } from "./app/app-component";
import { createRoot, renderRoot } from "./framework/createRoot";

createRoot(document.querySelector("main")!, AppComponent);
renderRoot();