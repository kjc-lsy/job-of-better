package site.dealim.jobconsulting.mapper;

import org.apache.ibatis.annotations.Mapper;
import site.dealim.jobconsulting.domain.ComCoverLetter;
import site.dealim.jobconsulting.domain.Program;

@Mapper
public interface CompanyMapper {
    public int ComcCoverLetterinsert(ComCoverLetter comCoverLetter);
    public int insertProgram(Program program);
}