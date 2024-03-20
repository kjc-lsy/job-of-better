import api from "./api";


export const userCoverLetterSave = (value,type) => {
    return api.post('/api/user/cover-letter-save', value.map(value => {
        return {
            mclCclIdx: value.id,
            mclAnswer: value.answer,
            type:type
        }
    }))
};



