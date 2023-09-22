import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
function TaskForm(){
const [title, setTitle]=useState('');
const [description, setDescription]=useState('');
const params = useParams();
const navigate = useNavigate();
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

const handleSubmit = async (e) => {
    e.preventDefault();
    let response
    if (!params.id){
         response = await axios.post('http://localhost:8000/tasks',{title,description});
    }
    else {
         response = await axios.put(`http://localhost:8000/tasks/${params.id}`,{title,description});
    }
    console.log(response);
    e.target.reset();
    navigate('/');
}
const handleDelete = async (e) => {
    e.preventDefault();
    const response = await axios.delete(`http://localhost:8000/tasks/${params.id}`);
    console.log(response);
    navigate('/');
}
useEffect(()=>
{
    if (params.id){
        getTask()
    }
    async function getTask(){
        const response = await axios.get(`http://localhost:8000/tasks/${params.id}`)
        setTitle(response.data.title);
        setDescription(response.data.description);
    }
},[]
)

    return (
        <div className="flex items-center justify-center h-[calc(100vh-10rem)]"> 
            <form className="bg-zinc-950 p-10" onSubmit={handleSubmit}>
                <input type="text" placeholder="title"
                className="block py-2 px-3 mb-4 w-full text-black"
                onChange={(e)=>setTitle(e.target.value)}
                value={title}
                autoFocus/>
                <textarea placeholder="description" 
                className="block py-2 px-3 mb-4 w-full text-black"
                rows={3} 
                onChange={(e)=>setDescription(e.target.value)}
                value={description}
                ></textarea>                
                <button className="bg-zinc-700 hover:bg-zinc-600 text-white py-2 rounded m-4">
                    {params.id?"Update":"Create"}
                    </button>
                    {params.id?(
                        <button
                    className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 rounded mt-5"
                    onClick={handleDelete}
                    >
                    Delete
                    </button>                        
                    ):null}
                    
            </form>
        </div>
    )
}
export default TaskForm;