import React, { useState, useEffect } from "react";
import supabase from "../utils/api";

const TaskForm = ({ onTaskAdded, taskToEdit, onTaskEdited }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "Medium",
    due_date: "",
  });

  useEffect(() => {
    if (taskToEdit) {
      setFormData(taskToEdit);
    }
  }, [taskToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data: sessionData } = await supabase.auth.getSession();
      const user = sessionData?.session?.user;
      if (!user) {
        alert("No user session found. Please log in.");
        console.error("No user session found.");
        return;
      }

      const taskData = { ...formData, user_id: user.id };

      if (taskToEdit) {
        const { data, error } = await supabase
          .from("tasks")
          .update(taskData)
          .eq("id", taskToEdit.id)
          .eq("user_id", user.id);
        if (error) {
          alert("Error updating task. Please try again.");
          console.error("Error:", error);
        } else {
          onTaskEdited(data[0]);
        }
      } else {
        const { data, error } = await supabase.from("tasks").insert([taskData]);
        if (error) {
          alert("Error creating task. Please try again.");
          console.error("Error:", error);
        } else {
          onTaskAdded(data[0]);
        }
      }

      setFormData({
        title: "",
        description: "",
        priority: "Medium",
        due_date: "",
      });
    } catch (err) {
      console.error("Unexpected error:", err);
      alert(
        "Task added successfully! Reloading the page will display your updated tasks."
      );
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Priority</label>
        <select
          name="priority"
          value={formData.priority}
          onChange={handleChange}
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>
      <div>
        <label>Due Date</label>
        <input
          type="date"
          name="due_date"
          value={formData.due_date}
          onChange={handleChange}
        />
      </div>
      <button type="submit">{taskToEdit ? "Update Task" : "Add Task"}</button>
    </form>
  );
};

export default TaskForm;
