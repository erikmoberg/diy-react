function render(jsxElement: JSX.Element) : Node {

    const element: HTMLElement = document.createElement(jsxElement.type);

    Object.entries(jsxElement.props || {}).forEach(([name, value]) => {
        if (name === "children") {
            (<Array<any>>value).forEach((child: any) => {
                element.appendChild(child.type === "TEXT_ELEMENT" 
                    ? document.createTextNode(<string>child.props)
                    : render(child));
            });
        } else if (name.startsWith("on")) {
            element.addEventListener(name.toLowerCase().substring(2), <EventListener>value);
        } else if (name === "className") {
            if (value) {
                const classes = (<string>value).split(" ");
                element.classList.forEach(c => element.classList.remove(c));
                classes.forEach(c => element.classList.add(c));
            }
        } else if (name === "htmlFor") {
            element.setAttribute("for", (<any>value).toString());
        } else {
            element[name] = (<any>value);
        }
    });

    return element;
}

export default render;