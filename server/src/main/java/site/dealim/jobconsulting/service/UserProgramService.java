package site.dealim.jobconsulting.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import site.dealim.jobconsulting.domain.Program;
import site.dealim.jobconsulting.mapper.CompanyMapper;
import site.dealim.jobconsulting.mapper.MemberMapper;
import site.dealim.jobconsulting.mapper.ProgramMapper;

import java.util.List;

@Service
public class UserProgramService {
    @Autowired
    private MemberMapper memberMapper;
    @Autowired
    private CompanyMapper companyMapper;
    @Autowired
    private ProgramMapper programMapper;

    public int updatePgIdx(Long pgIdx, Long memIdx) {
        return memberMapper.updatePgIdx(pgIdx, memIdx);
    }

    public String getComNameByComIdx(Long comIdx) {
        return companyMapper.getComNameByComIdx(comIdx);
    }

    public List<Program> getAllPrograms() {
        return programMapper.selectAllPrograms();
    }

}
