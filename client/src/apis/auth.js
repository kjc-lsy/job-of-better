import api from './api';

// 로그인
export const login = (username, password) => api.post(`/api/login?username=${username}&password=${password}`)

// 로그인 사용자 정보
export const info = () => api.get('/api/user/info')

// 회원 가입
export const join = (data) => api.post(`/api/user/join`, data)

// 회원 정보 수정
export const update = (data) => api.put(`/api/user/update`, data)

// 회원 탈퇴
export const remove = (userId) => api.delete(`/api/user/delete/${userId}`)
