import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import TaskNew from "./pages/TaskNew";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/tasks/new" element={<TaskNew/>}/>
      <Route path="/otro" element={<h1>otro</h1>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
