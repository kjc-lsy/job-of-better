package site.dealim.jobconsulting.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import site.dealim.jobconsulting.domain.Program;
import site.dealim.jobconsulting.mapper.ProgramMapper;

import java.util.List;

@Service
@Slf4j
public class ProgramService {
    @Autowired
    private ProgramMapper programMapper;
    public int insertProgram(Program program) {
        return programMapper.insertProgram(program);
    }

    public List<Program> getProgramsByComIdx(Long comIdx) {
        return programMapper.selectPgsByComIdx(comIdx);
    }

    public int deleteByPgIdx(Long pgIdx) {
        return programMapper.deleteByPgIdx(pgIdx);
    }

    public Program getProgramByPgIdx(Long pgIdx) {
        return programMapper.selectByPgIdx(pgIdx);
    }

    public int updateByPgIdx(Program program) {
        return programMapper.updateByPgIdx(program);
    }
}