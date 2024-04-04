import api from "./api";

export const setPgIdxOnUser = (pgIdx) => api.put('/api/user/set-pg-idx?pgIdx='+pgIdx)

export const userCoverLetterSave = (value) => {
    return api.post('/api/user/user-cover-letter-save', value.map(value => {
        return {
            mclCclIdx: value.id,
            mclAnswer: value.answer,
            mclIsConfirm:value.type
        }
    }))
};



