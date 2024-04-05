package site.dealim.jobconsulting.mapper;

import org.apache.ibatis.annotations.Mapper;
import site.dealim.jobconsulting.domain.Company;
import site.dealim.jobconsulting.domain.Member;
import site.dealim.jobconsulting.domain.MemberRole;

@Mapper
public interface MemberMapper {

    // 회원 등록
    public Long insertMember(Member member);

    // 회원 조회
    public Member selectMember(long idx);

    // 사용자 인증(로그인) - id
    public Member login(String username);

    // 회원 권한 등록
    public Long insertMemberRole(MemberRole memberRole);

    // 회원 수정
    public int updateMember(Member member);

    // 회원 삭제
    public int deleteMember(String username);

    int checkDuplicateUsername(String username);

    void companyJoin(Company company);

    int checkDuplicateBno(String comLicenseNum);
}
