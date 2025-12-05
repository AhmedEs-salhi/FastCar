import axiosClient from "./axiosClient";

export const getAvailableVehicules = () => {
  return axiosClient.get("/vehicules/available/");
};

export const createVehicule = (data) => {
  return axiosClient.post("/vehicules/", data);
};
