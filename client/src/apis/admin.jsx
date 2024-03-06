import api from "js-cookie";

export const coverLetterSave = (value) => {api.post("/coverLetterSave", value)}