import axios from "axios";
import { useEffect, useState } from "react";
import TaskList from "../components/TaskList";
function Home(){
    const [tasks, setTasks]=useState([])
    useEffect(()=>{
        async function getTaskList(){
            const response = await axios.get('http://localhost:8000/tasks');
            console.log(response);
            setTasks(response.data);

        }
        getTaskList();
    },[])
    return (
        <>
            <h1 className="text-3xl font-bold">Task List </h1>
            <TaskList tasks={tasks}/>
        </>
    )
}
export default Home;