import React, { useState, useEffect } from "react";
import supabase from "./utils/api";
import TaskList from "./components/TaskList";
import Login from "./components/Login";
import Register from "./components/Register";
import "./styles.css";

function App() {
  const [session, setSession] = useState(null);
  const [showRegister, setShowRegister] = useState(false);

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );

    return () => {
      if (authListener && authListener.subscription) {
        authListener.subscription.unsubscribe();
      }
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setSession(null);
  };

  return (
    <div className="App">
      <header>
        <h1>Task Management App</h1>
        {session && <button onClick={handleLogout}>Logout</button>}{" "}
      </header>
      {!session ? showRegister ? <Register /> : <Login /> : <TaskList />}
      {!session && (
        <button onClick={() => setShowRegister((prev) => !prev)}>
          {showRegister ? "Go to Login" : "Register"}
        </button>
      )}
    </div>
  );
}

export default App;
