import {apiClient} from "./api";

const url = "/termo";

export const getThermoExtrusion = async ({
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

export const getThermoCorte = async ({
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

export const getThermoEmbultaje = async ({
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
