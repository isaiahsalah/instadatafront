import {apiClient} from "./api";

const url = "/bolsas";

export const getExtrusion = async ({
  startDate,
  endDate,
}: {
  startDate: Date | undefined;
  endDate: Date | undefined;
}) => {
  try {
    const params = {
      startDate,
      endDate,
    };

    const response = await apiClient.get(url + "/extrusion", {params});
    return response.data;
  } catch (error) {
    console.error("Error al obtener extrusion en el front:", error);
    throw error;
  }
};

export const getCorte = async ({
  startDate,
  endDate,
}: {
  startDate: Date | undefined;
  endDate: Date | undefined;
}) => {
  try {
    const params = {
      startDate,
      endDate,
    };

    const response = await apiClient.get(url + "/corte", {params});
    console.log("📍📍", response);
    return response.data;
  } catch (error) {
    console.error("Error al obtener corte en el front:", error);
    throw error;
  }
};

export const getImpresion = async ({
  startDate,
  endDate,
}: {
  startDate: Date | undefined;
  endDate: Date | undefined;
}) => {
  try {
    const params = {
      startDate,
      endDate,
    };

    const response = await apiClient.get(url + "/impresion", {params});
    return response.data;
  } catch (error) {
    console.error("Error al obtener impresion en el front:", error);
    throw error;
  }
};

export const getEmpaque = async ({
  startDate,
  endDate,
}: {
  startDate: Date | undefined;
  endDate: Date | undefined;
}) => {
  try {
    const params = {
      startDate,
      endDate,
    };

    const response = await apiClient.get(url + "/empaque", {params});
    console.log("📍📍", response);
    return response.data;
  } catch (error) {
    console.error("Error al obtener empaque en el front:", error);
    throw error;
  }
};

export const getEmbultaje = async ({
  startDate,
  endDate,
}: {
  startDate: Date | undefined;
  endDate: Date | undefined;
}) => {
  try {
    const params = {
      startDate,
      endDate,
    };

    const response = await apiClient.get(url + "/embultaje", {params});
    console.log("📍📍", response);
    return response.data;
  } catch (error) {
    console.error("Error al obtener empaque en el front:", error);
    throw error;
  }
};
