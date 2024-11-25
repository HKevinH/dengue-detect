"""
# PatientData Schema

Este archivo define el esquema de datos `PatientData` utilizando Pydantic. Es un modelo que representa la estructura de los datos relacionados con pacientes, incluyendo síntomas y datos categóricos.

## Atributos principales:
### Síntomas (Sintomáticos):
- Representados por columnas que contienen información numérica (por ejemplo, `fiebre`, `cefalea`).
- Cada síntoma se modela como un atributo de tipo `int`, lo que permite registrar la intensidad o presencia de cada uno.

### Datos categóricos:
- Representan información descriptiva del paciente, como lugar de residencia, género, tipo de seguridad social, entre otros.
- Cada atributo se modela como un `str`.

## Propósito:
Este esquema es utilizado para validar datos de entrada y facilitar la comunicación entre los endpoints de la API y la lógica del negocio. Su diseño asegura que los datos cumplan con las expectativas definidas antes de ser procesados.

## Características:
- **`orm_mode`:** Habilita la compatibilidad con objetos ORM, lo que permite que el esquema funcione con los modelos SQLAlchemy.
- **Facilidad de validación:** Pydantic se encarga de validar los tipos y valores de los atributos automáticamente.

## Cómo extender:
- Agregar nuevos atributos si se requiere más información sobre el paciente.
- Ajustar los tipos de datos si las necesidades del negocio cambian.

"""
from pydantic import BaseModel

# Definir columnas
symptom_columns = [
    'fiebre', 'cefalea', 'dolor_retro_ocular', 'malgias', 'artralgia', 'erupcion',
    'dolor_abdominal', 'vomito', 'diarrea', 'somnolencia', 'hipotension', 'hepatomegalia',
    'hem_mucosa', 'hipotermia', 'aum_hemato', 'caida_plaquetas', 'acumulacion_liquidos',
    'extravasacion', 'hemorragia', 'choque', 'daño_organo'
]

categorical_columns = [
    'ciudad_residencia', 'dpto_residencia', 'nombre_municipio_procedencia',
    'sexo', 'tipo_seguridad_social', 'etnia', 'estrato', 'nacionalidad'
]

class PatientData(BaseModel):
    # Síntomas
    fiebre: int
    cefalea: int
    dolor_retro_ocular: int
    malgias: int
    artralgia: int
    erupcion: int
    dolor_abdominal: int
    vomito: int
    diarrea: int
    somnolencia: int
    hipotension: int
    hepatomegalia: int
    hem_mucosa: int
    hipotermia: int
    aum_hemato: int
    caida_plaquetas: int
    acumulacion_liquidos: int
    extravasacion: int
    hemorragia: int
    choque: int
    daño_organo: int

    # Datos categóricos
    ciudad_residencia: str
    dpto_residencia: str
    nombre_municipio_procedencia: str
    sexo: str
    tipo_seguridad_social: str
    etnia: str
    estrato: str
    nacionalidad: str
    
    class Config:
        orm_mode = True
        """
        Habilita la compatibilidad con objetos ORM, permitiendo que los datos se conviertan automáticamente desde y hacia objetos del ORM (como los modelos SQLAlchemy).
        """
