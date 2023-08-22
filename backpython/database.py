from motor.motor_asyncio import AsyncIOMotorClient
from bson import ObjectId
from fastapi import HTTPException

async def is_valid_id(id):
    try:
        ObjectId(id)
        return True
    except:
        return False

client = AsyncIOMotorClient('mongodb+srv://admin:admin@admin.qqwykfb.mongodb.net/')

database = client.todolist

tasks_collection = database.tasks
async def get_all_tasks():
    tasks =[]
    cursor = tasks_collection.find({})
    async for document in cursor:
        task_id = str(document['_id'])
        task_dic= dict(document)
        task_dic['_id'] = task_id
        tasks.append(task_dic)
    return tasks

async def get_one_task_id(id):
    if not await is_valid_id(id):
        raise HTTPException(400, "Invalid ID format")
    task = await tasks_collection.find_one({'_id': ObjectId(id)})
    if task:
        return task
    raise HTTPException(404, f"Not Found id {id}")

async def get_one_task(title):
    task = await tasks_collection.find_one({'title': title})
    return task

async def create_task(task):
    new_task = await tasks_collection.insert_one(task)
    created_task = await tasks_collection.find_one({'_id': new_task.inserted_id})
    return created_task

async def update_task_id(id: str, task):
    print(task)
    if not await is_valid_id(id):
        raise HTTPException(400, "Invalid ID format")
    task_found = await tasks_collection.find_one({'_id': ObjectId(id)})
    if task_found:
        task_to_update ={k:v for k, v in task.dict().items() if v is not None}
        print(task_to_update)
        await tasks_collection.update_one({'_id':ObjectId(id)}, {'$set': task_to_update})
        return task_to_update
    raise HTTPException(404, f"{id} <- id not found trying to update")


async def delete_task_id(id):
    if not await is_valid_id(id):
        raise HTTPException(400, "Invalid ID format")
    task = await tasks_collection.find_one({'_id': ObjectId(id)})
    if task:
        await tasks_collection.delete_one({'_id': ObjectId(id)})
        return task
    raise HTTPException(404, f"{id} <- id not found trying to update")