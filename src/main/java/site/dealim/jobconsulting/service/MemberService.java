package site.dealim.jobconsulting.service;

import jakarta.servlet.http.HttpServletRequest;
import site.dealim.jobconsulting.domain.Member;

public interface MemberService {
    // 회원 등록
    public Member insert(Member member);

    // 회원 조회
    public Member select(String memberId) throws Exception;

    // 회원 수정
    public Member update(Member memberId) throws Exception;

    // 회원 삭제
    public void delete(String memberId) throws Exception;

    // 로그인
    public void login(Member member, HttpServletRequest request) throws Exception;
}
