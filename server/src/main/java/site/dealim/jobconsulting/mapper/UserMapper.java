package site.dealim.jobconsulting.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import site.dealim.jobconsulting.domain.ComCoverLetter;
import site.dealim.jobconsulting.domain.MemberCoverLetter;

import java.util.List;

@Mapper
public interface UserMapper {

    List<ComCoverLetter> userCoverLetterInfo(Long comIdx);

    void userCoverLetterSave(List<MemberCoverLetter> values, long idx, Long comIdx);

    int updatePgIdx(@Param("pgIdx") Long pgIdx, @Param("memIdx") Long memIdx);
}
