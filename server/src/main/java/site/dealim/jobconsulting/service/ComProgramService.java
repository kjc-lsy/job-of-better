package site.dealim.jobconsulting.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.configurationprocessor.json.JSONException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import site.dealim.jobconsulting.domain.Program;
import site.dealim.jobconsulting.mapper.MemberMapper;
import site.dealim.jobconsulting.mapper.ProgramMapper;

import java.io.IOException;
import java.util.List;

@Service
@Slf4j
public class ComProgramService {
    @Autowired
    private ProgramMapper programMapper;
    @Autowired
    private MemberMapper memberMapper;
    @Autowired
    private VertexAiService vertexAiService;

    public int insertProgram(Program program) {
        return programMapper.insertProgram(program);
    }

    public List<Program> getProgramsByComIdx(Long comIdx) {
        return programMapper.selectPgsByComIdx(comIdx);
    }

    public int deleteByPgIdx(Long pgIdx) {
        return programMapper.updateIsWithdrawn(pgIdx);
    }

    public Program getProgramByPgIdx(Long pgIdx) {
        return programMapper.selectByPgIdx(pgIdx);
    }

    public int updateProgram(Program program) {
        return programMapper.updateProgram(program);
    }

    public List<Program> getAllPrograms() { return programMapper.selectAllPrograms();}

    public Integer getApprovedCntByPgIdx(Long pgIdx) { return memberMapper.getNumByPgIdxAndRegStatus(pgIdx, "Approved");}

    public Integer getRejectedCntByPgIdx(Long pgIdx) { return memberMapper.getNumByPgIdxAndRegStatus(pgIdx, "Rejected");}

    public Integer getPendingCntByPgIdx(Long pgIdx) { return memberMapper.getNumByPgIdxAndRegStatus(pgIdx, "Pending");}

    public Integer getTotalCntByPgIdx(Long pgIdx) { return memberMapper.getRegCntByPgIdx(pgIdx);}

    @Transactional
    public String getContSummary(Long pgIdx) {
        Program program = programMapper.selectByPgIdx(pgIdx);
        String content = program.getPgContent();
        String summary = "";
        try {
            summary = vertexAiService.getSummary(content);
            program.setPgContentSummary(summary);
        } catch (IOException e) {
            e.printStackTrace();
        } catch (JSONException e) {
            e.printStackTrace();
        }
        programMapper.updateProgram(program);

        return summary;
    }

}