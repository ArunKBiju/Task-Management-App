import React, { useState } from "react";
import supabase from "../utils/api";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) {
      alert("Registration failed. Try again.");
      console.error("Error registering user:", error);
    } else {
      alert(
        "Registration successful! Please check your email to verify your account."
      );
      console.log("Registration details:", data);
    }
  };

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button onClick={handleRegister}>Register</button>
    </form>
  );
};

export default Register;
