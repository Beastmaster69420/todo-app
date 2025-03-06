import { ListItem, Checkbox, IconButton, ListItemText } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Todo } from "../types/todo";

interface Props {
  todo: Todo;
  toggleComplete: (id: number) => void;
  removeTodo: (id: number) => void;
}

const TodoItem: React.FC<Props> = ({ todo, toggleComplete, removeTodo }) => {
  return (
    <ListItem>
      <Checkbox checked={todo.completed} onChange={() => toggleComplete(todo.id)} />
      <ListItemText primary={todo.task} sx={{ textDecoration: todo.completed ? "line-through" : "none" }} />
      <IconButton onClick={() => removeTodo(todo.id)} color="error">
        <DeleteIcon />
      </IconButton>
    </ListItem>
  );
};

export default TodoItem;
