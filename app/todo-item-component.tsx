import { h } from "../framework/h"
import { TodoItemModel } from "./todo-item-model";

export function TodoItemComponent(
    {todo, handleRemove, handleToggleDone} 
    : { todo: TodoItemModel, handleRemove: (todo: TodoItemModel) => void, handleToggleDone: (todo: TodoItemModel) => void }) {

    return (
        <div>
            <input checked={todo.isDone} type="checkbox" id={todo.key}></input>
            <label htmlFor={todo.key} onClick={() => handleToggleDone(todo)} className={todo.isDone ? "done": ""}>{todo.title}</label>
            <button onClick={() => handleRemove(todo)}>Remove</button>
        </div>
    );
}
