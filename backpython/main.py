from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from decouple import config
from database import get_all_tasks, create_task, get_one_task, get_one_task_id, delete_task_id, update_task_id
from models import Task

app = FastAPI()
app.title = "Tasks App"
app.version ="1.0.0"
origins = [config('CLI_URL')]
# [
#     r"http://.%2A/.localhost/.com:.*",
# ]
# Configuración y middleware aquí
app.add_middleware(
          CORSMiddleware,
          allow_origins=origins,
          allow_methods=["*"],
          allow_headers=["*"],
          allow_credentials=True
)
@app.get('/')
def welcome():
    return {'message': 'Welcome to my first FastAPI'}

@app.get('/tasks')
async def get_tasks():
    tasks = await get_all_tasks()
    # print(tasks)
    return tasks

@app.post('/tasks', response_model=Task)
async def save_task(task: Task):
    taskFound = await get_one_task(task.title)
    if taskFound:
        raise HTTPException(409, "Task already exists")
    task_dict = task.model_dump()
    response = await create_task(task_dict)

    if response:
         return response
    raise HTTPException(400, 'Something went wrong')

@app.get('/tasks/{id}', response_model=Task)
async def get_task(id: str):
    # print(id)
    task = await get_one_task_id(id)
    if task:
        return task
    return HTTPException(404, f"Task {id} Not Found")

@app.put('/tasks/{id}', response_model=Task)
async def update_task(id:str, task:Task):
    task_updated = await update_task_id(id, task)
    if task_updated:
        return task_updated
    return HTTPException(404, f"Task {id} Not Found")

@app.delete('/tasks/{id}', response_model=Task)
async def delete_task(id: str):
    task = await delete_task_id(id)
    if task:
        return task
    return HTTPException(404, f"Task {id} Not Found")