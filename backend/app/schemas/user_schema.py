from pydantic import BaseModel, EmailStr


class UserCreate(BaseModel):
    email: EmailStr
    password: str
    name: str
    
    
class UserResponse(BaseModel):
    id: int
    email: EmailStr
    name: str
    state_account: str
    role: str
    online: bool
    class Config:
        from_attributes = True