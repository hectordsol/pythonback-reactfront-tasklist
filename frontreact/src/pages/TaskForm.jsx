import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
function TaskForm(){
const [title, setTitle]=useState('');
const [description, setDescription]=useState('');
const params = useParams();
console.log(params);
// const handleSubmit = (e) => {
//     e.preventDefault();
//     const response = await fetch('http://localhost:8000/tasks', {
//         method:'POST',
//         body: JSON.stringify({
//             title,
//             description
//         }),
//         headers:{'Content-type':'application-data/json'
//         }
//     })
//     const data = response.json()
//     return data
// }

const handleSubmit = (e) => {
    e.preventDefault();
    const response = axios.post('http://localhost:8000/tasks',{title,description});
    console.log(response);
    e.target.reset();
}

    return (
        <div className="flex items-center justify-center h-[calc(100vh-10rem)]"> 
            <form className="bg-zinc-950 p-10" onSubmit={handleSubmit}>
                <input type="text" placeholder="title"
                className="block py-2 px-3 mb-4 w-full text-black"
                onClick={(e)=>setTitle(e.target.value)}
                autoFocus/>
                <textarea placeholder="description" 
                className="block py-2 px-3 mb-4 w-full text-black"
                rows={3} onClick={setDescription(e.target.value)}></textarea>
                <button>Save</button>
            </form>
        </div>
    )
}
export default TaskForm;