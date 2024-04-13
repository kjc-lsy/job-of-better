import api from "./api";

export const curentProgramIdxInfo = () => {
    return api.get('/api/company/curent-program-idx-info')
}


export const coverLetterSave = (value) => {
    return api.post('/api/company/cover-letter-save', value.map(value => {
        return {
            cclIdx: value.id,
            cclPgIdx: value.pgIdx,
            cclLetterQuestion: value.question,
            cclMinLength: value.minlength,
            cclMaxLength: value.maxlength
        }
    }))
};

export const coverLetterInfo = (pgIdx) => {
    return api.get(`/api/company/cover-letter-info/${pgIdx}`)
}


export function coverLetterDelete(id) {
    return api.delete(`/api/company/cover-letter-delete/${id}`)
}

