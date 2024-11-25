"""
# User Schemas

Este archivo define los esquemas relacionados con la gestión de usuarios utilizando Pydantic. Los esquemas se utilizan para validar y estructurar los datos en diferentes etapas de la API, como la creación de usuarios, el inicio de sesión y las respuestas de la API.

## Esquemas principales:
1. **`UserCreate`**:
   - Representa los datos necesarios para crear un usuario.
   - Valida el correo electrónico utilizando `EmailStr`.
   
2. **`UserResponse`**:
   - Define la estructura de los datos devueltos al cliente tras realizar operaciones relacionadas con usuarios (por ejemplo, obtener detalles de un usuario).
   - Incluye atributos como el estado de la cuenta, rol y estado en línea.
   - **Configuración especial**:
     - `from_attributes = True`: Permite que Pydantic transforme automáticamente objetos ORM (como modelos de SQLAlchemy) en este esquema.

3. **`UserLogin`**:
   - Representa los datos necesarios para autenticar un usuario.
   - Incluye correo electrónico y contraseña.

4. **`LoginResponse`**:
   - Define la respuesta de la API tras un inicio de sesión exitoso.
   - Contiene el token de acceso y su tipo (generalmente `bearer`).

## Cómo extender:
- Agregar nuevos atributos a los esquemas si se requieren más datos en las solicitudes o respuestas.
- Implementar validaciones personalizadas mediante decoradores en los atributos.

"""
from pydantic import BaseModel, EmailStr


class UserCreate(BaseModel):
    """
    Esquema para la creación de usuarios.

    ### Atributos:
    - **`email`**: Dirección de correo electrónico válida.
    - **`password`**: Contraseña del usuario.
    - **`name`**: Nombre del usuario.
    """
    email: EmailStr
    password: str
    name: str
    
    
class UserResponse(BaseModel):
    """
    Esquema para representar la respuesta de operaciones relacionadas con usuarios.

    ### Atributos:
    - **`id`**: Identificador único del usuario.
    - **`email`**: Dirección de correo electrónico del usuario.
    - **`name`**: Nombre del usuario.
    - **`state_account`**: Estado de la cuenta (por ejemplo, "activo", "inactivo").
    - **`role`**: Rol del usuario (por ejemplo, "administrador", "usuario").
    - **`online`**: Estado en línea del usuario (`True` o `False`).

    ### Configuración:
    - **`from_attributes = True`**: Permite la compatibilidad con modelos ORM.
    """
    id: int
    email: EmailStr
    name: str
    state_account: str
    role: str
    online: bool

    class Config:
        from_attributes = True


class UserLogin(BaseModel):
    """
    Esquema para autenticar usuarios (inicio de sesión).

    ### Atributos:
    - **`email`**: Dirección de correo electrónico válida.
    - **`password`**: Contraseña del usuario.
    """
    email: EmailStr
    password: str


class LoginResponse(BaseModel):
    """
    Esquema para la respuesta de inicio de sesión.

    ### Atributos:
    - **`access_token`**: Token de acceso generado tras autenticación exitosa.
    - **`token_type`**: Tipo de token (generalmente "bearer").
    """
    access_token: str
    token_type: str
