import api from "./api";

export const coverLetterSave = (value) => api.post("/cover-letter-save", value);