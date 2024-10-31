from pydantic import BaseModel

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