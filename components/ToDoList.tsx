import { List } from "@mui/material";
import TodoItem from "./ToDoItem";
import { Todo } from "../types/todo";

interface Props {
  todos: Todo[];
  toggleComplete: (id: number) => void;
  removeTodo: (id: number) => void;
}

const TodoList: React.FC<Props> = ({ todos, toggleComplete, removeTodo }) => {
  return (
    <List>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} toggleComplete={toggleComplete} removeTodo={removeTodo} />
      ))}
    </List>
  );
};

export default TodoList;
