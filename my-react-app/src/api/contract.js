import axiosClient from "./axiosClient";

export const confirmContrat = (id, agentId) => {
  return axiosClient.post(`/contracts/${id}/confirm/`, {
    id_agent: agentId,
  });
};

export const calculateContrat = (id) => {
  return axiosClient.get(`/contracts/${id}/calculate/`);
};

export const createContrat = (data) => {
  return axiosClient.post("/contracts/", data);
};

