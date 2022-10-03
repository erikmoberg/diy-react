import h from "./h"
import useState from "./useState"
import TodoItemComponent from "./todo-item-component";
import TodoItemModel from "./todo-item-model";

function MyComponent() {

    let [text, setText] = useState("");

    let [todos, setTodos] = useState<Array<TodoItemModel>>([ 
        { title: "Granular updates", isDone: false, key: "test1" },
        { title: "Scoped CSS", isDone: false, key: "test2" },
        { title: "Add SVG", isDone: false, key: "test3" }
    ]);

    function textChanged(e: React.ChangeEvent<HTMLInputElement>) {
         setText(e.target.value);
    }

    function submitTextHandler() {
        setTodos([...todos, { title: text, isDone: false, key: Math.random().toString() } ]);
        setText("");
    }

    function removeTodo(todo: TodoItemModel) {
        const index = todos.indexOf(todo);
        const newItems = [...todos];
        newItems.splice(index, 1);
        setTodos(newItems);
    }

    function toggleTodoDone(todo: TodoItemModel) {
        const newItems = [...todos];
        const index = newItems.indexOf(todo);
        newItems[index] = { ...todo, isDone: !todo.isDone }
        setTodos(newItems);
    }

    return (
        <div className="app">
            <h1>The ToDo List</h1>
            <form className="todoForm" onSubmit={submitTextHandler}>
                <label>What needs to be done?</label>
                <div className="inputContainer">
                    <input type="text" value={text} onChange={textChanged}></input>
                    <button type="submit">Add</button>
                </div>
            </form>
            <ul>
            {
                todos.map(t => (<li className="toDoItem"><TodoItemComponent todo={t} handleRemove={removeTodo} handleToggleDone={toggleTodoDone}></TodoItemComponent></li>))
            }
            </ul>
        </div>
    );
  }
  
  export default MyComponent;