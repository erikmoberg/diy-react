import MyComponent from "./my-component";
import render from "./render";

function renderAll() {
    const value = MyComponent();
    const node = render(value);
    document.querySelector("main")!.innerHTML = "";
    document.querySelector("main")?.appendChild(node);
}

renderAll();

export default renderAll;