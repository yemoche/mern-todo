import React from "react";
import { BrowserRouter,  Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Todos from "./routes/Todos";
import NewTodo from "./routes/NewTodo"
// import ProtectedRoutes from "./components/ProtectedRoutes";

//  import Error from './routes/Error';



export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create-todo" element={<NewTodo />} />
        <Route path="/todos" element={<Todos />} />
      </Routes>
    </BrowserRouter>
  );
}


