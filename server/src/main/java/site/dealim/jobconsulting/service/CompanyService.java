package site.dealim.jobconsulting.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import site.dealim.jobconsulting.domain.ComCoverLetter;
import site.dealim.jobconsulting.domain.Program;
import site.dealim.jobconsulting.mapper.CompanyMapper;

@Service
public class CompanyService {
    @Autowired
    private CompanyMapper companyMapper;
    public ComCoverLetter comCoverLetterSave(ComCoverLetter comCoverLetter) {
        return null;

    }

    public int insertProgram(Program program) {
        return companyMapper.insertProgram(program);
    }

}
