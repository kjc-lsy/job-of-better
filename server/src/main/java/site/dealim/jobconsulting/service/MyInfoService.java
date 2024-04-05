package site.dealim.jobconsulting.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import site.dealim.jobconsulting.domain.ComCoverLetter;
import site.dealim.jobconsulting.domain.Member;
import site.dealim.jobconsulting.domain.MemberCoverLetter;
import site.dealim.jobconsulting.mapper.MemCoverLetterMapper;
import site.dealim.jobconsulting.mapper.MemberMapper;

import java.util.List;

@Service
public class MyInfoService {
    @Autowired
    private MemberMapper memberMapper;


    public Member userProfileInfo(String username) {
        return memberMapper.login(username);
    }


}
