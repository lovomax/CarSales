import axios from "axios";
/*7087*/
export const api = axios.create({
  baseURL: "https://localhost:5001",
});

const setHeader = (config) => {
  const userData =
    "Bearer " + localStorage.getItem("data")?.replaceAll('"', "");
  if (userData) {
    config.headers.Authorization = userData;
  }

  return config;
};

api.interceptors.request.use(setHeader);
