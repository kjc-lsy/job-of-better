package site.dealim.jobconsulting.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import site.dealim.jobconsulting.domain.Member;
import site.dealim.jobconsulting.domain.Program;
import site.dealim.jobconsulting.dto.ProgramCompanyDto;
import site.dealim.jobconsulting.mapper.MemberMapper;
import site.dealim.jobconsulting.mapper.ProgramMapper;

import java.util.HashMap;
import java.util.Map;

@Service
public class MyInfoService {
    @Autowired
    private MemberMapper memberMapper;
    @Autowired
    private ProgramMapper programMapper;

    public Member userProfileInfo(String username) {
        return memberMapper.login(username);
    }

    public ProgramCompanyDto pgInfo(Long pgIdx) {
        return programMapper.pgInfo(pgIdx);
    }
}