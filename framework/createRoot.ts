import render from "./render"

let globalRoot: HTMLElement;
let globalBaseComponent: () => JSX.Element;

export function createRoot(root: HTMLElement, component: () => JSX.Element) {
    globalRoot = root;
    globalBaseComponent = component;
}

export function renderRoot() {
    const value = globalBaseComponent();
    document.getElementById("debug")!.innerHTML = JSON.stringify(value, null, 2);
    const node = render(value);
    globalRoot.innerHTML = "";
    globalRoot.appendChild(node);
}
