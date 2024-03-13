import api from "./api";

export const coverLetterSave = (value) => {
    return api.post('/api/company/cover-letter-save', value)
};