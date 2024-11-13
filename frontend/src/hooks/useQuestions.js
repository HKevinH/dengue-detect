import { mapSiNoToInt } from "../utils/utils";

export const useQuestions = () => {
  const sendQuestion = async (values) => {
    const transformedValues = {
      // Síntomas (convertir "si"/"no" a 1/0)
      fiebre: mapSiNoToInt(values.fiebre),
      cefalea: mapSiNoToInt(values.cefalea),
      dolor_retro_ocular: mapSiNoToInt(values.dolor_retro_ocular),
      malgias: mapSiNoToInt(values.malgias),
      artralgia: mapSiNoToInt(values.artralgia),
      erupcion: mapSiNoToInt(values.erupcion),
      dolor_abdominal: mapSiNoToInt(values.dolor_abdominal),
      vomito: mapSiNoToInt(values.vomito),
      diarrea: mapSiNoToInt(values.diarrea),
      somnolencia: mapSiNoToInt(values.somnolencia),
      hipotension: mapSiNoToInt(values.hipotension),
      hepatomegalia: mapSiNoToInt(values.hepatomegalia),
      hem_mucosa: mapSiNoToInt(values.hem_mucosa),
      hipotermia: mapSiNoToInt(values.hipotermia),
      aum_hemato: mapSiNoToInt(values.aum_hemato),
      caida_plaquetas: mapSiNoToInt(values.caida_plaquetas),
      acumulacion_liquidos: mapSiNoToInt(values.acumulacion_liquidos),
      extravasacion: mapSiNoToInt(values.extravasacion),
      hemorragia: mapSiNoToInt(values.hemorragia),
      choque: mapSiNoToInt(values.choque),
      daño_organo: mapSiNoToInt(values.daño_organo),

      // Datos categóricos (asumiendo que los recolectas en el formulario)
      ciudad_residencia: values.ciudad_residencia,
      dpto_residencia: values.dpto_residencia,
      nombre_municipio_procedencia: values.nombre_municipio_procedencia,
      sexo: values.sexo,
      tipo_seguridad_social: values.tipo_seguridad_social,
      etnia: values.etnia,
      estrato: values.estrato,
      nacionalidad: values.nacionalidad,

      // Fecha (asegúrate de formatearla correctamente)
      fechaSintomas: values.fechaSintomas,
    };

    console.log(transformedValues);
  };

  return { sendQuestion };
};
