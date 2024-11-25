"""
# Esquemas de Usuario

Este archivo define varios esquemas relacionados con los usuarios, utilizados para validar datos de entrada y estructurar las respuestas en los endpoints de la API. Los esquemas están diseñados para garantizar que los datos cumplan con las expectativas antes de ser procesados o enviados al cliente.

## Esquemas definidos:
1. **`UserCreate`**:
   - Esquema para la creación de un nuevo usuario.
   - Valida que el correo electrónico sea válido y requiere una contraseña y un nombre.

2. **`UserResponse`**:
   - Esquema para las respuestas relacionadas con usuarios.
   - Incluye el identificador del usuario, correo electrónico, nombre, estado de la cuenta, rol y si el usuario está en línea.
   - Utiliza `from_attributes` para compatibilidad con objetos ORM.

3. **`UserLogin`**:
   - Esquema para la validación de credenciales en el inicio de sesión.
   - Requiere un correo electrónico válido y una contraseña.

4. **`LoginResponse`**:
   - Esquema para estructurar las respuestas del inicio de sesión.
   - Contiene un token de acceso y su tipo.

## Cómo extender:
- Agregar nuevos atributos o esquemas si se necesitan más funcionalidades (por ejemplo, actualización de usuarios).
- Incluir validaciones adicionales según las reglas de negocio.

"""
from pydantic import BaseModel, EmailStr

class UserCreate(BaseModel):
    """
    Esquema para la creación de un usuario.

    ### Atributos:
    - **`email`**: Correo electrónico del usuario. Valida el formato del correo utilizando `EmailStr`.
    - **`password`**: Contraseña del usuario.
    - **`name`**: Nombre del usuario.
    """
    email: EmailStr
    password: str
    name: str

class UserResponse(BaseModel):
    """
    Esquema para las respuestas relacionadas con usuarios.

    ### Atributos:
    - **`id`**: Identificador único del usuario.
    - **`email`**: Correo electrónico del usuario.
    - **`name`**: Nombre del usuario.
    - **`state_account`**: Estado de la cuenta (por ejemplo, "activo", "inactivo").
    - **`role`**: Rol del usuario (por ejemplo, "administrador", "usuario").
    - **`online`**: Indica si el usuario está en línea.
    """
    id: int
    email: EmailStr
    name: str
    state_account: str
    role: str
    online: bool

    class Config:
        """
        Configuración del esquema para compatibilidad con ORM.

        - `from_attributes`: Permite que los datos sean extraídos directamente de objetos ORM.
        """
        from_attributes = True

class UserLogin(BaseModel):
    """
    Esquema para validar las credenciales en el inicio de sesión.

    ### Atributos:
    - **`email`**: Correo electrónico del usuario. Valida el formato del correo utilizando `EmailStr`.
    - **`password`**: Contraseña del usuario.
    """
    email: EmailStr
    password: str

class LoginResponse(BaseModel):
    """
    Esquema para las respuestas del inicio de sesión.

    ### Atributos:
    - **`access_token`**: Token de acceso generado para el usuario.
    - **`token_type`**: Tipo de token (por ejemplo, "bearer").
    """
    access_token: str
    token_type: str
