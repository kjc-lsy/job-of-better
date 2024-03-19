import api from "./api";

export const saveProgram = (inputValues) => api.post('/api/program/insert-program', inputValues)

export const getPrograms = () => api.post('/api/program/get-programs')

export const deleteProgram = (pgIdx) => api.delete('/api/program/delete-program/'+pgIdx)

export const getProgram = (pgIdx) => api.get(`/api/program/get-program?pgIdx=${pgIdx}`)

export const updateProgram = (pgIdx, pgContent) => api.put('/api/program/update-program-cont', {pgIdx, pgContent})
