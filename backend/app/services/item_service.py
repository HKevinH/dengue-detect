from app.models.item import Item as ItemModel
from app.schemas.item_schema import ItemCreate
from app.db.base import fake_db

# Definir todos los en crud para crear usuario

def create_item(item: ItemCreate):
    new_item = ItemModel(id=len(fake_db) + 1, **item.dict())
    fake_db.append(new_item)
    return new_item

def get_item_by_id(item_id: int):
    for item in fake_db:
        if item.id == item_id:
            return item
    return None
