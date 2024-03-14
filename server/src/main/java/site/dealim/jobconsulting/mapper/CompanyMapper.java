package site.dealim.jobconsulting.mapper;

import org.apache.ibatis.annotations.Mapper;
import site.dealim.jobconsulting.domain.ComCoverLetter;

import java.util.HashMap;
import java.util.List;

@Mapper
public interface CompanyMapper {
    public int ComCoverLetterinsert(HashMap map);
}