from fastapi import APIRouter, HTTPException
from app.schemas.item_schema import ItemCreate, Item
from app.services.item_service import create_item, get_item_by_id

router = APIRouter()

# Definir todos los endpoints y testarlos
# Usar Token y JWT para verificar acceso a los endpoints
# Importante documentar todos los endpoints
# Ejemplo de un CRUD
# Crear un item
# Leer un item
# Actualizar un item
# Importante no meter logica de negocio en los endpoints

@router.post("/items/", response_model=Item)
def create_item_view(item: ItemCreate):
    return create_item(item)

@router.get("/items/{item_id}", response_model=Item)
def get_item_view(item_id: int):
    item = get_item_by_id(item_id)
    if not item:
        raise HTTPException(status_code=404, detail="Item not found")
    return item
