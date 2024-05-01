import api from './api';

// 회원 확인
export const checkDuplicateUsername = (username) => api.post(`/api/auth/check-duplicate-username?username=${username}`)

// 로그인
export const login = (username, password) => api.post(`/login?username=${username}&password=${password}`)

// 로그인 사용자 정보
export const info = () => api.get('/api/auth/info')

// 회원 가입
export const join = (data) => api.post(`/api/auth/join`, data)

// 회원 정보 수정
export const update = (data) => api.put(`/api/auth/update`, data)

// 회원 탈퇴
export const remove = (userId) => api.delete(`/api/auth/delete/${userId}`)

// 로그아웃
export const logout = () => api.get('/api/logout')

// 기업 가입
export const companyJoin = async (data) => {
    // 회사 정보와 멤버 정보 JSON 형식으로 전송
    const memberCompanyData = {
        member: {
            username: data.username,
            password: data.password,
            name: data.name,
            email: data.email,
            phone: data.phone
        },
        company: {
            comName: data.b_name,
            comCeoName: data.b_ceoName,
            comAddress: data.address,
            comDetailAddress: data.detailAddr,
            comZipcode: data.zipCode,
            comLicenseNum: data.b_no,
            comOpeningDate: data.b_openingDate,
            comTel: data.b_tel
        }
    };

    try {
        const response = await api.post('/api/auth/company-join', memberCompanyData, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.status === 200) {
            const comIdx = response.data; // 회사 ID를 응답에서 받음
            return await uploadLicense(comIdx, data.b_img);
        } else {
            throw new Error('Failed to register company details');
        }
    } catch (error) {
        console.error('Error during the company registration process:', error);
        throw error;
    }
};

// 사업자 등록증 파일 전송
const uploadLicense = async (comIdx, file) => {
    const formData = new FormData();
    formData.append('comIdx', comIdx);
    formData.append('file', file);
    formData.append('path', 'license'); // 경로 예시로 'license' 사용

    return api.post('/api/auth/company-join-license', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
};




//사업자 번호 확인
export const checkDuplicateBNo = (value) => {
    return api.post('/api/auth/check-duplicate-bno?comLicenseNum=' + value);
};
