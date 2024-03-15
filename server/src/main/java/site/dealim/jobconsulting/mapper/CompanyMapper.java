package site.dealim.jobconsulting.mapper;

import org.apache.ibatis.annotations.Mapper;
import site.dealim.jobconsulting.domain.ComCoverLetter;
import site.dealim.jobconsulting.domain.Program;

import java.util.HashMap;
import java.util.List;

@Mapper
public interface CompanyMapper {
    void ComCoverLetterinsert(HashMap map);

    List<ComCoverLetter> comCoverLetterInfo(Long comIdx);

    int ComCoverLetterUpdate(HashMap map);

    void ComCoverLetterDelete(HashMap map);
}