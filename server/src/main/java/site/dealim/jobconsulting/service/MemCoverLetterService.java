package site.dealim.jobconsulting.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import site.dealim.jobconsulting.domain.ComCoverLetter;
import site.dealim.jobconsulting.domain.MemberCoverLetter;
import site.dealim.jobconsulting.mapper.ComCoverLetterMapper;
import site.dealim.jobconsulting.mapper.MemCoverLetterMapper;

import java.util.List;

@Service
public class MemCoverLetterService {
    @Autowired
    private MemCoverLetterMapper userMapper;
    @Autowired
    private ComCoverLetterMapper comCoverLetterMapper;

    public List<ComCoverLetter> userCoverLetterInfo(Long comIdx) {
        return comCoverLetterMapper.userCoverLetterInfo(comIdx);
    }


    public void userCoverLetterSave(List<MemberCoverLetter> values, long idx, Long comIdx) {
        userMapper.userCoverLetterSave(values, idx, comIdx);
    }


}
