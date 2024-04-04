package site.dealim.jobconsulting.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import site.dealim.jobconsulting.domain.ComCoverLetter;
import site.dealim.jobconsulting.domain.MemberCoverLetter;
import site.dealim.jobconsulting.mapper.UserMapper;

import java.util.List;

@Service
public class UserService {
    @Autowired
    private UserMapper userMapper;

    public List<ComCoverLetter> userCoverLetterInfo(Long comIdx) {
        return userMapper.userCoverLetterInfo(comIdx);
    }


    public void userCoverLetterSave(List<MemberCoverLetter> values, long idx, Long comIdx) {
        userMapper.userCoverLetterSave(values, idx, comIdx);
    }

    public int updatePgIdx(Long pgIdx, Long memIdx) {
        return userMapper.updatePgIdx(pgIdx, memIdx);
    }
}
