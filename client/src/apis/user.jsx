import api from "./api";

//자소서 정보
export const coverLetterInfo = () => {
    return api.get(`/api/user/user-cover-letter-info`)
}


//프로그램 정보
export const pgInfo = () => {
    return api.get('/api/user/pg-info')
}


export const userCoverLetterSave = (value, mclTitle) => {
    //console.log(value);
    return api.post('/api/user/user-cover-letter-save', value.map(value => {
        return {
            mclIdx: value.id,
            mclCclIdx: value.cclIdx,
            mclAnswer: value.answer,
            mclIsConfirm: value.type,
            mclTitle: mclTitle,
        }
    }))
};

export const registerInterview = (value) => {
    const time = value.setSeconds(0, 0)
    return api.post(`/api/user/register-interview?registeredInterviewDate=${new Date(time + 9 * 60 * 60 * 1000).toISOString()}`)
}

//사용자 정보
export const userProfileInfo = () => {
    return api.get('/api/user/user-profile-info')
}

export const getCurrentOccupancy = (slotStartDatetime) => {
    const time = slotStartDatetime.setSeconds(0, 0)
    return api.get('/api/user/get-current-occupancy?slotStartDatetime=' + new Date(time + 9 * 60 * 60 * 1000).toISOString())
}