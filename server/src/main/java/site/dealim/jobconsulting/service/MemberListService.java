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
    @Autowired
    private CommonService commonService;

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

    public Page<MemberListDto> getSearchedMembers(Pageable pageable, Long memIdx, String keyword, Long currPgIdx, String coverLetterFilter, String resumeFilter, String interviewFilter, String regStatusFilter) {
        Long comIdx = commonService.getComIdxByMemIdx(memIdx);
        List<Member> members = memberMapper.getFilteredMembersList(pageable, comIdx, keyword, currPgIdx, coverLetterFilter, resumeFilter, interviewFilter, regStatusFilter);

        List<MemberListDto> content = members.stream().map(member -> {
            return MemberListDto.builder()
                    .member(member)
                    .pgTitle(programMapper.selectPgTitleByPgIdx(member.getPgIdx()))
                    .build();
        }).toList();

        long total = memberMapper.getFilteredMembersCnt(comIdx, keyword, currPgIdx, coverLetterFilter, resumeFilter, interviewFilter, regStatusFilter);

        return new PageImpl<>(content, pageable, total);
    }

    public Member getMemberInfoByIdx(long idx) {
        return memberMapper.selectMember(idx);
    }

    public Integer updateRegStatus(Long memIdx, String status) {
        return memberMapper.updatePgRegStatus(status, memIdx);
    }

}