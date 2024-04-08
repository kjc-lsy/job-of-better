package site.dealim.jobconsulting.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import site.dealim.jobconsulting.domain.MemberCoverLetter;

import java.util.List;

@Mapper
public interface MemCoverLetterMapper {

    void userCoverLetterSave(List<MemberCoverLetter> values, long idx, Long comIdx);

    int coverLetterInfo(@Param("idx") long idx,@Param("pgIdx") Long pgIdx);
}