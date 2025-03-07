"use client";

import { useState, useEffect } from "react";
import { useSession, signIn } from "next-auth/react";
import { Container, Typography, Paper, Button } from "@mui/material";
import TodoForm from "../components/ToDoForm";
import TodoList from "../components/ToDoList";
import Auth from "../components/Auth";
import { Todo } from "../types/todo";

export default function Home() {
  const { data: session } = useSession();
  const [todos, setTodos] = useState<Todo[]>([]);

  // Load todos from localStorage on mount
  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  // Save todos to localStorage on change
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // Function to add a new task
  const addTodo = (task: string) => {
    setTodos([...todos, { id: Date.now(), task, completed: false }]);
  };

  // Function to toggle task completion
  const toggleComplete = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // Function to remove a task
  const removeTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <Container maxWidth="sm">
      {/* Authentication UI */}
      <Auth />

      {/* Show Sign-In Button if Not Logged In */}
      {!session ? (
        <Paper sx={{ padding: 3, mt: 3, textAlign: "center" }}>
          <Typography variant="h5">Please Sign In to Manage Your Tasks</Typography>
          <Button variant="contained" color="error" onClick={() => signIn("google")} sx={{ mt: 2 }}>
            Sign In with Google
          </Button>
        </Paper>
      ) : (
        <Paper sx={{ padding: 3, mt: 3 }}>
          <Typography variant="h4" gutterBottom>
            {session.user?.name}'s To-Do List
          </Typography>
          {/* Task Input Form */}
          <TodoForm addTodo={addTodo} />
          {/* Task List */}
          <TodoList todos={todos} toggleComplete={toggleComplete} removeTodo={removeTodo} />
        </Paper>
      )}
    </Container>
  );
}
