import api from "./api";

export const getComNameByComIdx = () => api.get('/api/company/get-com-name')


export const coverLetterSave = (value) => {
    return api.post('/api/company/cover-letter-save', value.map(value => {
        return {
            cclIdx: value.id,
            cclLetterQuestion: value.question,
            cclMinLength: value.minlength,
            cclMaxLength: value.maxlength
        }
    }))
};

export const coverLetterInfo = () => {
    return api.get('/api/company/cover-letter-info')
}

export function coverLetterDelete(id) {
    return api.delete(`/api/company/cover-letter-delete/${id}`)
}