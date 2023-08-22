from pydantic import BaseModel
from typing import Optional
from bson import ObjectId

class PyObjectId(ObjectId):
    @classmethod
    def __get_validators__(cls):
        yield cls.validate
    @classmethod
    def validate(cls, value):
        if not ObjectId.is_valid(value):
            raise ValueError('Invalid Object ID')
        return str(value)
    
    # def __get_pydantic_core_schema__(self):
    #     return {'type': 'str'} 
    
class Task(BaseModel):
    _id: PyObjectId
    title: str
    description: Optional[str] = None
    completed: bool = False

    class Config:
        from_attributes = True
        populate_by_name = True
        json_encoders = {ObjectId: str}
        arbitrary_types_allowed = True 