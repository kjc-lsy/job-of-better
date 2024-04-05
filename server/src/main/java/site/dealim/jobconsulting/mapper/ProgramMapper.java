package site.dealim.jobconsulting.mapper;

import org.apache.ibatis.annotations.Mapper;
import site.dealim.jobconsulting.domain.Program;
import site.dealim.jobconsulting.dto.ProgramCompanyDto;

import java.util.List;

@Mapper
public interface ProgramMapper {
    public int insertProgram(Program program);
    public List<Program> selectPgsByComIdx(Long comIdx);
    public int updateIsWithdrawn(Long pgIdx);
    public Program selectByPgIdx(Long pgIdx);
    public int updateProgram(Program program);

    List<Program> selectAllPrograms();

    public ProgramCompanyDto pgInfo(Long pgIdx);
}
