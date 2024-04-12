package site.dealim.jobconsulting.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import site.dealim.jobconsulting.domain.Member;
import site.dealim.jobconsulting.dto.MemberListDto;
import site.dealim.jobconsulting.mapper.MemberMapper;
import site.dealim.jobconsulting.mapper.ProgramMapper;

import java.util.ArrayList;
import java.util.List;

@Service
@Slf4j
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

    public Page<MemberListDto> getAllMembersPage(Pageable pageable) {
        List<Member> members = memberMapper.getMemberListPage(pageable);

        List<MemberListDto> content = members.stream().map(member -> {
            return MemberListDto.builder()
                    .member(member)
                    .pgTitle(programMapper.selectPgTitleByPgIdx(member.getPgIdx()))
                    .build();
        }).toList();

        int total = memberMapper.getMemberTotalCnt();
        return new PageImpl<>(content, pageable, total);
    }

    public String getProgramTitleByPgIdx(Long pgIdx) {
        return programMapper.selectPgTitleByPgIdx(pgIdx);
    }

    public Member getMemberInfoByIdx(long idx) {
        return memberMapper.selectMember(idx);
    }

}