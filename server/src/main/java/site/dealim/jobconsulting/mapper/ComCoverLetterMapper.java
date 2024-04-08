package site.dealim.jobconsulting.mapper;

import org.apache.ibatis.annotations.Mapper;
import site.dealim.jobconsulting.domain.ComCoverLetter;

import java.util.HashMap;
import java.util.List;

@Mapper
public interface ComCoverLetterMapper {
    void ComCoverLetterinsert(HashMap map);

    List<ComCoverLetter> comCoverLetterInfo(Long comIdx);

    int ComCoverLetterUpdate(HashMap map);

    void ComCoverLetterDelete(HashMap map);

    List<ComCoverLetter> userCoverLetterInfo(Long pgIdx);

}