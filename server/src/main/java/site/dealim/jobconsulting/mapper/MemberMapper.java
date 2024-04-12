package site.dealim.jobconsulting.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.data.domain.Pageable;
import site.dealim.jobconsulting.domain.Member;
import site.dealim.jobconsulting.domain.MemberRole;

import java.util.List;

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
    Integer getNumByPgIdxAndpgRegStatus(@Param("pgIdx")Long pgIdx, @Param("pgRegStatus")String pgRegStatus);

    Integer updatepgRegStatus(@Param("pgRegStatus")String pgRegStatus, @Param("memIdx")Long memIdx);

    void updateCompanyIdx(@Param("comIdx")Long comIdx, @Param("memIdx") Long memIdx);

    void interviewTimeSave(@Param("desiredInterviewDate")String desiredInterviewDate,@Param("idx") long idx);

    int cancelRegister(Long memIdx);

    List<Member> selectAllMembers();

    int getMemberTotalCnt(Long comIdx);

    List<Member> getMemberListPage(@Param("pageable")Pageable pageable, @Param("comIdx")Long comIdx);

}
