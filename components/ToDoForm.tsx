import { useState } from "react";
import { TextField, Button } from "@mui/material";

interface Props {
  addTodo: (task: string) => void;
}

const TodoForm: React.FC<Props> = ({ addTodo }) => {
  const [task, setTask] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!task.trim()) return;
    addTodo(task);
    setTask("");
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", gap: "10px" }}>
      <TextField
        label="New Task"
        variant="outlined"
        fullWidth
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <Button type="submit" variant="contained"  sx={{ backgroundColor: " #FF5112", "&:hover": { backgroundColor: "darkred" } }}>
        Add
      </Button>
    </form>
  );
};

export default TodoForm;
