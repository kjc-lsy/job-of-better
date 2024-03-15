package site.dealim.jobconsulting.mapper;

import org.apache.ibatis.annotations.Mapper;
import site.dealim.jobconsulting.domain.Program;

import java.util.List;

@Mapper
public interface ProgramMapper {
    public int insertProgram(Program program);
    public List<Program> selectByComIdx(Long comIdx);
}
