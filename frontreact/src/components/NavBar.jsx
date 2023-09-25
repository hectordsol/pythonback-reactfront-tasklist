import { Link, useNavigate } from "react-router-dom";

function NavBar(){
    const navigate = useNavigate();
    return (
        <header className="flex justify-between items-center my-7">
            <Link to="/">
            <h1 className="bg-zinc-700 hover:bg-gray-600 text-white text-3xl font-bold py-4 px-4 rounded">Task App</h1>
            </Link>
            <Link to="/tasks/new"
            className="bg-zinc-700 hover:bg-gray-600 text-white font-bold py-4 px-4 rounded"
            >Create Task</Link>
        </header>
    )
}
export default NavBar;