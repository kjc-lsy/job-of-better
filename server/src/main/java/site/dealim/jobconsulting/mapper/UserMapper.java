package site.dealim.jobconsulting.mapper;

import org.apache.ibatis.annotations.Mapper;
import site.dealim.jobconsulting.domain.ComCoverLetter;

import java.util.List;

@Mapper
public interface UserMapper {

    List<ComCoverLetter> userCoverLetterInfo(Long comIdx);
}
