import { useNavigate } from "react-router-dom";

function Task({task}){
    const navigate = useNavigate();
    return (
        <div key={task._id}
         className="bg-zinc-950 gap-4 hover:cursor-pointer hover:bg-gray-950"
         onClick={()=>{navigate('/tasks/'+task._id)}}
        >
                        <h2>{task.title}</h2>
                        <p>{task.description}</p>
        </div>
    )
}
export default Task;