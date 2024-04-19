import api from "./api";

export const saveProgram = (inputValues) => api.post('/api/company/program/insert-program', inputValues)

export const getPrograms = () => api.post('/api/company/program/get-all-programs')

export const getValidPrograms = () => api.post('/api/user/program/get-valid-programs')

export const deleteProgram = (pgIdx) => api.delete('/api/company/program/delete-program/'+pgIdx)

export const getProgram = (pgIdx) => api.get(`/api/company/program/get-program?pgIdx=${pgIdx}`)

export const updateProgram = (program) => api.put('/api/company/program/update-program', program)

export const registerProgram = (pgIdx, pgComIdx) => api.put(`/api/user/program/register-program?pgIdx=${pgIdx}&pgComIdx=${pgComIdx}`)

export const cancelRegister = () => api.post('/api/user/program/cancel-register')

export const getComNameByComIdx = (comIdx) => api.get(`/api/user/program/get-com-name?comIdx=${comIdx}`)

export const getTotalMemNum = (pgIdx) => api.get(`/api/company/program/get-all-mem-num?pgIdx=${pgIdx}`)

export const getApprovedMemNum = (pgIdx) => api.get(`/api/company/program/get-approved-mem-num?pgIdx=${pgIdx}`)

export const getRegisteredMemNum = (pgIdx) => api.get(`/api/company/program/get-registered-mem-num?pgIdx=${pgIdx}`)

export const getRejectedMemNum = (pgIdx) => api.get(`/api/company/program/get-rejected-mem-num?pgIdx=${pgIdx}`)

export const getContentSummary = (pgIdx) => api.get(`/api/company/program/get-content-summary?pgIdx=${pgIdx}`)

export const getWaitingRegDto = () => api.get('/api/user/program/get-waiting-reg')