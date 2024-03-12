package site.dealim.jobconsulting.mapper;

import org.apache.ibatis.annotations.Mapper;
import site.dealim.jobconsulting.domain.ComCoverLetter;

@Mapper
public interface CompanyMapper {
    public int ComcCoverLetterinsert(ComCoverLetter comCoverLetter);
}