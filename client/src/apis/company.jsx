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

export const updateRegStatus = (memIdx, status) => api.put(`/api/company/update-reg-status?memIdx=${memIdx}&status=${status}`)

// 회사 소속 회원들 페이지
export const getMembersPage = (page, pageSize, keyword, currPgIdx, coverLetterFilter, resumeFilter, interviewFilter, regStatusFilter, signal) => {
    return api.get(`/api/company/get-filtered-members`, {
        params: {
            page,
            size: pageSize,
            keyword,
            currPgIdx,
            coverLetterFilter,
            resumeFilter,
            interviewFilter,
            regStatusFilter
        },
        signal: signal
    });
}

//사용자 정보 조회
export const getMemberListInfoByIdx = (idx) => api.get(`/api/company/get-user-info/${idx}`)

export const getCountApi = (currProg) => {
    return api.get("/api/company/get-user-count/"+currProg)
}