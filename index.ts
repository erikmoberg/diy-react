import AppComponent from "./app/app-component";
import render from "./framework/render";

function renderAll() {
    const value = AppComponent();
    const node = render(value);
    document.querySelector("main")!.innerHTML = "";
    document.querySelector("main")?.appendChild(node);
}

renderAll();

export default renderAll;