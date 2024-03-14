package site.dealim.jobconsulting.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import site.dealim.jobconsulting.domain.Program;
import site.dealim.jobconsulting.mapper.ProgramMapper;

@Service
public class ProgramService {
    @Autowired
    private ProgramMapper programMapper;
    public int insertProgram(Program program) {
        return programMapper.insertProgram(program);
    }

}