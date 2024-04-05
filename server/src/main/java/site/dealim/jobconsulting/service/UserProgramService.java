package site.dealim.jobconsulting.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import site.dealim.jobconsulting.mapper.CompanyMapper;
import site.dealim.jobconsulting.mapper.MemberMapper;

@Service
public class UserProgramService {
    @Autowired
    private MemberMapper memberMapper;
    @Autowired
    private CompanyMapper companyMapper;

    public int updatePgIdx(Long pgIdx, Long memIdx) {
        return memberMapper.updatePgIdx(pgIdx, memIdx);
    }

    public String getComNameByComIdx(Long comIdx) {
        return companyMapper.getComNameByComIdx(comIdx);
    }

}
