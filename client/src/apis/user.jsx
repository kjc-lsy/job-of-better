import api from "./api";

//자소서 정보
export const coverLetterInfo = () => {
    return api.get(`/api/user/user-cover-letter-info`)
}
export const userComCoverLetterInfo = () => {
    return api.get(`/api/user/user-com-cover-letter-info`)
}

//프로그램 정보
export const pgInfo = () => {
    return api.get('/api/user/pg-info')
}


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
    return api.post(`/api/user/interview-time-save?desiredInterviewDate=${value}`)
}

//사용자 정보
export const userProfileInfo = () => {
    return api.get('/api/user/user-profile-info')
}
