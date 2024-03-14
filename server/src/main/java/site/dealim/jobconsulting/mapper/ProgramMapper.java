package site.dealim.jobconsulting.mapper;

import org.apache.ibatis.annotations.Mapper;
import site.dealim.jobconsulting.domain.Program;

@Mapper
public interface ProgramMapper {
    public int insertProgram(Program program);
}
