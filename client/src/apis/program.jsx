import api from "./api";

export const programSave = (title, content) => api.post('/api/program/insert-program', {title, content})

export const getPrograms = () => api.post('/api/program/get-programs')

export const deleteProgram = (pgIdx) => api.delete('/api/program/delete-program/'+pgIdx)