package site.dealim.jobconsulting.mapper;

import org.apache.ibatis.annotations.Mapper;
import site.dealim.jobconsulting.domain.MemberCoverLetter;

import java.util.List;

@Mapper
public interface MemCoverLetterMapper {

    void userCoverLetterSave(List<MemberCoverLetter> values, long idx, Long comIdx);

}