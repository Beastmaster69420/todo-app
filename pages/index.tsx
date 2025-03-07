"use client";

import { useState, useEffect } from "react";
import { useSession, signIn } from "next-auth/react";
import { Container, Typography, Paper, Button } from "@mui/material";
import TodoForm from "../components/ToDoForm";
import TodoList from "../components/ToDoList";
import Auth from "../components/Auth";
import { Todo } from "../types/todo";
import { useRouter } from "next/router";


const getJWTFromLocalStorage = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("jwt_token");
  }
  return null;
};

export default function Home() {
  const { data: session, status } = useSession();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [jwt, setJwt] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }

    const storedJwt = getJWTFromLocalStorage();
    if (storedJwt) {
      setJwt(storedJwt);
    }

    setLoading(false);
  }, [session]);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // Function to add a new task
  const addTodo = (task: string) => {
    setTodos([...todos, { id: Date.now(), task, completed: false }]);
  };

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


  const handleGoogleSignIn = () => {

    if (!session) {
      signIn("google", { callbackUrl: "/" });
    }
  };

  // If still loading session or JWT, don't render app yet
  if (loading || status === "loading") {
    return (
      <Container maxWidth="sm">
        <Typography variant="h5">Loading...</Typography>
      </Container>
    );
  }

  if (!session && !jwt) {
    router.push("/login");
    return null; 
  }

  return (
    <Container maxWidth="sm">
      <Auth />

      {/* Show sign-in page if not authenticated */}
      {!session && !jwt ? (
        <Paper sx={{ padding: 3, mt: 3, textAlign: "center" }}>
          <Typography variant="h5">Please Sign In to Manage Your Tasks</Typography>
          <Button
            variant="contained"
            color="error"
            onClick={handleGoogleSignIn} // Trigger only if not logged in
            sx={{ mt: 2 }}
          >
            Sign In with Google
          </Button>
        </Paper>
      ) : (
        <Paper sx={{ padding: 3, mt: 3 }}>
          <Typography variant="h4" gutterBottom>
            {session?.user?.name || "User"}'s To-Do List
          </Typography>

          {/* Show Todos Form */}
          <TodoForm addTodo={addTodo} />

          {/* Show Todos List */}
          <TodoList todos={todos} toggleComplete={toggleComplete} removeTodo={removeTodo} />
        </Paper>
      )}
    </Container>
  );
}
