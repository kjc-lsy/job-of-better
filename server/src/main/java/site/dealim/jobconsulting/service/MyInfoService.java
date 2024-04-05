package site.dealim.jobconsulting.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import site.dealim.jobconsulting.domain.Member;
import site.dealim.jobconsulting.mapper.MemberMapper;

@Service
public class MyInfoService {
    @Autowired
    private MemberMapper memberMapper;

    public Member userProfileInfo(long idx) {
        return memberMapper.userProfileInfo(idx);
    }

}