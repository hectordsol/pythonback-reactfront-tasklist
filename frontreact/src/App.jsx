import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import TaskForm from "./pages/TaskForm";
import NavBar from "./components/NavBar";

function App() {

  return (
    <BrowserRouter>
    <div className="container m-10 px-10">
      <NavBar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/tasks/:id" element={<TaskForm/>}/>
        <Route path="/tasks/new" element={<TaskForm/>}/>
        <Route path="/otro" element={<h1>otro</h1>}/>
      </Routes>
    </div>
    </BrowserRouter>
  )
}

export default App
