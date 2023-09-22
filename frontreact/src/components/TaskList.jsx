import Task from "./Task";

function TaskList({tasks}){
    return (
        <div className="grid grid-cols-3 gap-4">
            {
                tasks.map(task =>   (
                    <Task task={task} key={task._id}/>
                )
                )
            }
        </div>
    )
}
export default TaskList;