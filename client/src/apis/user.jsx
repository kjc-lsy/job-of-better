import api from "./api";


export const userCoverLetterSave = (value) => {
    return api.post('/api/user/cover-letter-save', value.map(value => {
        return {
            cclComIdx: value.com_idx,
            cclLetterQuestion: value.question,
            cclMinLength: value.minlength,
            cclMaxLength: value.maxlength
        }
    }))
};


