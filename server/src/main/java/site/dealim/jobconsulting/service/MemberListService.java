package site.dealim.jobconsulting.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import site.dealim.jobconsulting.domain.Member;
import site.dealim.jobconsulting.dto.MemberListDto;
import site.dealim.jobconsulting.mapper.MemberMapper;
import site.dealim.jobconsulting.mapper.ProgramMapper;

import java.util.ArrayList;
import java.util.List;

@Service
public class MemberListService {

    @Autowired
    private MemberMapper memberMapper;
    @Autowired
    private ProgramMapper programMapper;

    /**
     * @return
     * 유저 권한만 가진 멤버 리스트 + 프로그램 명
     */
    public List<MemberListDto> getMembersList() {

        List<Member> members = memberMapper.selectAllMembers();
        List<MemberListDto> memberListDtos = new ArrayList<>();

        for (Member member : members) {
            memberListDtos.add(MemberListDto.builder().member(member).pgTitle(programMapper.selectPgTitleByPgIdx(member.getPgIdx())).build());
        }

        return memberListDtos;
    }

    public String getProgramTitleByPgIdx(Long pgIdx) {
        return programMapper.selectPgTitleByPgIdx(pgIdx);
    }

    public Member getMemberInfoByIdx(long idx) {
        return memberMapper.selectMember(idx);
    }

}