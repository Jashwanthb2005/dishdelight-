import { useState } from 'react';
import toast from 'react-hot-toast';
import './Register.css'; // Include custom styles
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [userInput, setUserInput] = useState({ username: "", email: "", password: "" });

  function handleChange(e) {
    setUserInput({ ...userInput, [e.target.name]: e.target.value });
  }

  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    if (userInput.username === "" || userInput.email === "" || userInput.password === "") {
      return toast.error("Every input field must have a value...");
    }

    console.log("Request Body:", userInput);
    const callAPI = await fetch("http://127.0.0.1:4010/registrationcheck", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userInput),
    });

    const response = await callAPI.json();
    if (response.error) {
      return toast.error(response.error);
    }

    navigate('/verification');
  }

  return (
    <div className="register-container">
      <form method="post" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            className="form-control"
            placeholder="John Doe"
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            className="form-control"
            placeholder="johndoe@gmail.com"
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            className="form-control"
            placeholder="******"
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">Register</button>
      </form>
    </div>
  );
}
