import api from "./api";

export const programSave = (title, content) => api.post('/api/program/insert-program', {title, content})