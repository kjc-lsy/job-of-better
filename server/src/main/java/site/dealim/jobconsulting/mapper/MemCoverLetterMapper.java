package site.dealim.jobconsulting.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import site.dealim.jobconsulting.domain.MemberCoverLetter;
import site.dealim.jobconsulting.dto.CoverLetterDto;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Mapper
public interface MemCoverLetterMapper {

    void userCoverLetterSave(Map map);

    List<MemberCoverLetter> coverLetterInfo(@Param("idx") long idx,@Param("pgIdx") Long pgIdx);

    MemberCoverLetter memCoverLetterInfo(@Param("cclIdx") long cclIdx);

    List<CoverLetterDto> userCoverLetterInfo(@Param("idx") long idx,@Param("pgIdx") Long pgIdx);

    void userCoverLetterUpdate(Map map);
}