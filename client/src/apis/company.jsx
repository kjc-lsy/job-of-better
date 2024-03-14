import api from "./api";

export const coverLetterSave = (value) => {
    return api.post('/api/company/cover-letter-save', value)
};

export const programSave = (title, content) => api.post('/api/company/insert-program', {'title': title, 'content': content})
