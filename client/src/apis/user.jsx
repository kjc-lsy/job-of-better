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


export const interviewTimeSave = (value) => {
    return api.post('/api/user/interview-time-save', value.map(value => {
        return {
            desiredInterviewTime: value.interviewDate + " " + value.interviewTime
        }
    }))
}


export const userProfileInfo = () => {
    return api.get('/api/user/user-profile-info')
}
