"use strict";
(() => {
  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b ||= {})
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));

  // h.ts
  function h(type, props, ...children) {
    if (type instanceof Function) {
      return type(props);
    }
    const appendChild = (childCollection, child) => {
      if (Array.isArray(child)) {
        child.forEach((nestedChild) => appendChild(childCollection, nestedChild));
      } else {
        childCollection.push(
          child.type ? h(child.type, child.props, child.children) : {
            key: null,
            props: child,
            type: "TEXT_ELEMENT"
          }
        );
      }
    };
    const elementProps = props != null ? props : {};
    if (children.length && elementProps.children === void 0) {
      const childrenProp = [];
      children.forEach((child) => {
        var _a;
        if (child === void 0) {
        } else if ((_a = child.props) == null ? void 0 : _a.children) {
          childrenProp.push(child);
        } else {
          appendChild(childrenProp, child);
        }
      });
      elementProps.children = childrenProp;
    }
    return {
      key: null,
      props: elementProps,
      type
    };
  }
  var h_default = h;

  // useState.ts
  var state = [];
  var counter = 0;
  function useState(initialValue) {
    var existing = state[counter];
    if (existing) {
      counter++;
      return existing;
    }
    var myCounter = counter;
    const setValue = (val) => {
      state[myCounter][0] = val;
      counter = 0;
      diy_react_default();
    };
    existing = state[counter] = [initialValue, setValue];
    counter++;
    return existing;
  }
  var useState_default = useState;

  // todo-item-component.tsx
  function TodoItemComponent({ todo, handleRemove, handleToggleDone }) {
    return /* @__PURE__ */ h_default("div", null, /* @__PURE__ */ h_default("input", {
      checked: todo.isDone,
      type: "checkbox",
      id: todo.key
    }), /* @__PURE__ */ h_default("label", {
      htmlFor: todo.key,
      onClick: () => handleToggleDone(todo),
      className: todo.isDone ? "done" : ""
    }, todo.title), /* @__PURE__ */ h_default("button", {
      onClick: () => handleRemove(todo)
    }, "Remove"));
  }
  var todo_item_component_default = TodoItemComponent;

  // my-component.tsx
  function MyComponent() {
    let [text, setText] = useState_default("");
    let [todos, setTodos] = useState_default([
      { title: "Granular updates", isDone: false, key: "test1" },
      { title: "Scoped CSS", isDone: false, key: "test2" },
      { title: "Add SVG", isDone: false, key: "test3" }
    ]);
    function textChanged(e) {
      setText(e.target.value);
    }
    function submitTextHandler() {
      setTodos([...todos, { title: text, isDone: false, key: Math.random().toString() }]);
      setText("");
    }
    function removeTodo(todo) {
      const index = todos.indexOf(todo);
      const newItems = [...todos];
      newItems.splice(index, 1);
      setTodos(newItems);
    }
    function toggleTodoDone(todo) {
      const newItems = [...todos];
      const index = newItems.indexOf(todo);
      newItems[index] = __spreadProps(__spreadValues({}, todo), { isDone: !todo.isDone });
      setTodos(newItems);
    }
    return /* @__PURE__ */ h_default("div", {
      className: "app"
    }, /* @__PURE__ */ h_default("h1", null, "The ToDo List"), /* @__PURE__ */ h_default("form", {
      className: "todoForm",
      onSubmit: submitTextHandler
    }, /* @__PURE__ */ h_default("label", null, "What needs to be done?"), /* @__PURE__ */ h_default("div", {
      className: "inputContainer"
    }, /* @__PURE__ */ h_default("input", {
      type: "text",
      value: text,
      onChange: textChanged
    }), /* @__PURE__ */ h_default("button", {
      type: "submit"
    }, "Add"))), /* @__PURE__ */ h_default("ul", null, todos.map((t) => /* @__PURE__ */ h_default("li", {
      className: "toDoItem"
    }, /* @__PURE__ */ h_default(todo_item_component_default, {
      todo: t,
      handleRemove: removeTodo,
      handleToggleDone: toggleTodoDone
    })))));
  }
  var my_component_default = MyComponent;

  // render.ts
  function render(jsxElement) {
    const element = document.createElement(jsxElement.type);
    Object.entries(jsxElement.props || {}).forEach(([name, value]) => {
      if (name === "children") {
        value.forEach((child) => {
          element.appendChild(child.type === "TEXT_ELEMENT" ? document.createTextNode(child.props) : render(child));
        });
      } else if (name.startsWith("on")) {
        element.addEventListener(name.toLowerCase().substring(2), value);
      } else if (name === "className") {
        if (value) {
          const classes = value.split(" ");
          element.classList.forEach((c) => element.classList.remove(c));
          classes.forEach((c) => element.classList.add(c));
        }
      } else if (name === "htmlFor") {
        element.setAttribute("for", value.toString());
      } else {
        element[name] = value;
      }
    });
    return element;
  }
  var render_default = render;

  // index.ts
  function renderAll() {
    var _a;
    const value = my_component_default();
    const node = render_default(value);
    document.querySelector("main").innerHTML = "";
    (_a = document.querySelector("main")) == null ? void 0 : _a.appendChild(node);
  }
  renderAll();
  var diy_react_default = renderAll;
})();
