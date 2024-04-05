package site.dealim.jobconsulting.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
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

    Member userProfileInfo(long idx);

    // 회원 pgIdx 수정
    int updatePgIdx(@Param("pgIdx") Long pgIdx, @Param("memIdx") Long memIdx);

    // 프로그램 신청 회원 수 조회
    Integer getRegCntByPgIdx(Long pgIdx);

    // 상태에 따른 회원 수 조회
    Integer getNumByPgIdxAndRegStatus(@Param("pgIdx")Long pgIdx, @Param("reg_status")String regStatus);

}
