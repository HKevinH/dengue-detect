import { useState } from "react";
import { sendModelQuestion } from "../api/http.client";
import { mapSiNoToInt } from "../utils/utils";

export const useQuestions = () => {
  const [responseLabel, setResponseLabel] = useState(null);
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
      //   ciudad_residencia: values.ciudad_residencia,
      ciudad_residencia: "CALI",
      //   dpto_residencia: values.dpto_residencia,
      dpto_residencia: "VALLE DEL CAUCA",
      //   nombre_municipio_procedencia: values.nombre_municipio_procedencia,
      nombre_municipio_procedencia: "CALI",
      //   sexo: values.sexo,
      sexo: "M",
      //   tipo_seguridad_social: values.tipo_seguridad_social,
      tipo_seguridad_social: "Contributivo",
      //   etnia: values.etnia, // No se necesita transformar  acomodar en las la lista

      etnia: "Otro",
      //   estrato: values.estrato,
      estrato: "1",
      nacionalidad: "COLOMBIA",

      // Fecha (asegúrate de formatearla correctamente)
      fechaSintomas: values.fechaSintomas.format("DD/MM/YYYY"),
    };

    try {
      const res = await sendModelQuestion(transformedValues);
      console.log(res);
      setResponseLabel(res);
    } catch (error) {
      console.error(error);
    }
  };

  return { sendQuestion, responseLabel };
};
