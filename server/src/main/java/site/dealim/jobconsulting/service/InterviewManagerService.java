package site.dealim.jobconsulting.service;

import org.springframework.stereotype.Service;
import site.dealim.jobconsulting.dto.InterviewManagerDto;
import site.dealim.jobconsulting.mapper.InterviewSlotMapper;

import java.util.List;

@Service
public class InterviewManagerService {
    private final InterviewSlotMapper interviewSlotMapper;
    public InterviewManagerService(InterviewSlotMapper interviewSlotMapper) {
        this.interviewSlotMapper = interviewSlotMapper;
    }

    public List<InterviewManagerDto> getOccupiedSlotByPgIdx(Long pgIdx) {
        return interviewSlotMapper.selectOccupiedSlotByPgIdx(pgIdx);
    }
}
