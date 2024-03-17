package site.dealim.jobconsulting.service;

import jakarta.servlet.http.HttpServletRequest;
import site.dealim.jobconsulting.domain.Member;

public interface MemberService {
    // 회원 등록
    public int insert(Member member);

    // 회원 조회
    public Member select(long idx);

    // 회원 수정
    public int update(Member member);

    // 회원 삭제
    public int delete(String memberId);

    // 로그인
    public void login(Member member, HttpServletRequest request);
}
