import api from "./api";

export const coverLetterSave = (value) => api.post("/coverLetterSave", value);

