package site.dealim.jobconsulting.service;

import org.springframework.stereotype.Service;
import site.dealim.jobconsulting.dto.InterviewManagerDto;
import site.dealim.jobconsulting.mapper.InterviewSlotMapper;
import site.dealim.jobconsulting.mapper.MemberMapper;

import java.util.List;

@Service
public class InterviewManagerService {
    private final InterviewSlotMapper interviewSlotMapper;
    private final MemberMapper memberMapper;
    public InterviewManagerService(InterviewSlotMapper interviewSlotMapper, MemberMapper memberMapper) {
        this.interviewSlotMapper = interviewSlotMapper;
        this.memberMapper = memberMapper;
    }

    public List<InterviewManagerDto> getOccupiedSlotByPgIdx(Long pgIdx) {
        return interviewSlotMapper.selectOccupiedSlotByPgIdx(pgIdx);
    }

    public Integer updateInterviewStatus(Long memIdx, String interviewStatus) {
        return memberMapper.updateInterviewStatus(interviewStatus, memIdx);
    }
}
