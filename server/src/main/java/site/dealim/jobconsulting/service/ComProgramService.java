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
import java.time.LocalDate;
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

    public int deleteByPgIdx(Long pgIdx) {
        return programMapper.updateIsWithdrawn(pgIdx);
    }

    public Program getProgramByPgIdx(Long pgIdx) {
        return programMapper.selectByPgIdx(pgIdx);
    }

    public int updateProgram(Program program) {
        return programMapper.updateProgram(program);
    }

    public List<Program> getAllPrograms(Long comIdx) {
        return programMapper.selectAllPgsInComIdx(comIdx);
    }

    public Integer getApprovedCntByPgIdx(Long pgIdx) {
        return memberMapper.getNumByPgIdxAndpgRegStatus(pgIdx, "Approved");
    }

    public Integer getRejectedCntByPgIdx(Long pgIdx) {
        return memberMapper.getNumByPgIdxAndpgRegStatus(pgIdx, "Rejected");
    }

    public Integer getRegisteredCntByPgIdx(Long pgIdx) {
        return memberMapper.getNumByPgIdxAndpgRegStatus(pgIdx, "Registered");
    }

    public Integer getTotalCntByPgIdx(Long pgIdx) {
        return memberMapper.getRegCntByPgIdx(pgIdx);
    }

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

    public void updateAllProgramsStatus() {
        programMapper.selectAllPrograms().forEach(program -> {
            String currStatus = getCurrStatus(program);

            if (currStatus != null) {
                log.info("프로그램 상태 업데이트 스케줄링...(매일 자정)");

                programMapper.updatePgStatus(program.getPgIdx(), currStatus);
            }
        });
    }

    public String getCurrStatus(Program program) {
        LocalDate now = LocalDate.now();

        if (now.isBefore(program.getPgProgStartDate())) {
            return "Prestart";
        }

        if (now.isAfter(program.getPgProgStartDate()) && now.isBefore(program.getPgProgEndDate())) {
            return "Ongoing";
        }

        if (now.isAfter(program.getPgProgEndDate())) {
            return "Ended";
        }

        if (now.isAfter(program.getPgRegValStartDate()) && now.isBefore(program.getPgRegValEndDate())) {
            return "Registration";
        }

        if (now.isAfter(program.getPgInterviewValStartDate()) && now.isBefore(program.getPgInterviewValEndDate())) {
            return "Interviewing";
        }

        if (now.isAfter(program.getPgEduStartDate()) && now.isBefore(program.getPgEduEndDate())) {
            return "Educating";
        }

        return null;
    }

}