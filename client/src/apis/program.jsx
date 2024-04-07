import api from "./api";

export const saveProgram = (inputValues) => api.post('/api/com/program/insert-program', inputValues)

export const getPrograms = () => api.post('/api/com/program/get-all-programs')

export const deleteProgram = (pgIdx) => api.delete('/api/com/program/delete-program/'+pgIdx)

export const getProgram = (pgIdx) => api.get(`/api/com/program/get-program?pgIdx=${pgIdx}`)

export const updateProgram = (program) => api.put('/api/com/program/update-program', program)

export const getAllPrograms = () => api.post('/api/com/program/get-all-programs')

export const registerProgram = (pgIdx, pgComIdx) => api.put(`/api/user/program/register-program?pgIdx=${pgIdx}&pgComIdx=${pgComIdx}`)

export const getComNameByComIdx = (comIdx) => api.get(`/api/user/program/get-com-name?comIdx=${comIdx}`)

export const getTotalMemNum = (pgIdx) => api.get(`/api/com/program/get-all-mem-num?pgIdx=${pgIdx}`)

export const getApprovedMemNum = (pgIdx) => api.get(`/api/com/program/get-approved-mem-num?pgIdx=${pgIdx}`)

export const getPendingMemNum = (pgIdx) => api.get(`/api/com/program/get-pending-mem-num?pgIdx=${pgIdx}`)

export const getRejectedMemNum = (pgIdx) => api.get(`/api/com/program/get-rejected-mem-num?pgIdx=${pgIdx}`)

export const getContentSummary = (pgIdx) => api.get(`/api/com/program/get-content-summary?pgIdx=${pgIdx}`)
