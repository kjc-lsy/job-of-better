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
    return api.get(`/api/company/cover-letter-info?pgIdx=${pgIdx}`)
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

export const getOccupiedSlot = (pgIdx) => api.get("/api/company/interview-manager/get-occupied-slot?pgIdx="+pgIdx)

export const updateInterviewStatus = (memIdx, status) => api.put('/api/company/interview-manager/update-interview-status', {memIdx, status})

export const getInterviewCommet = (memIdx) => api.get(`/api/company/get-interview-comment?memIdx=${memIdx}`)

export const updateInterviewComment = (memIdx, comment) => api.put('/api/company/update-interview-comment', {memIdx, comment})

export const getFilesByPathAndIdx = (path, memIdx) => api.get(`/api/files/get-files-idx?path=${path}&memIdx=${memIdx}`)

export const getCoverLetterInfosByMemIdx = async (memIdx) => api.get(`/api/company/user-cover-letter-info?memIdx=${memIdx}`)

export const userCompanyInfo = api.get('/api/company/user-company-info')