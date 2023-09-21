import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import TaskForm from "./pages/TaskForm";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/tasks/:id" element={<TaskForm/>}/>
        <Route path="/tasks/new" element={<TaskForm/>}/>
      <Route path="/otro" element={<h1>otro</h1>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
