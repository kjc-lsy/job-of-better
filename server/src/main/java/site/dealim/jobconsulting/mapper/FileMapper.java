package site.dealim.jobconsulting.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Param;
import org.springframework.data.domain.Pageable;
import site.dealim.jobconsulting.domain.File;
import site.dealim.jobconsulting.domain.Member;
import site.dealim.jobconsulting.domain.MemberRole;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Mapper
public interface FileMapper {
    void upload(File file);

    void deleteFile(@Param("idx") long idx, @Param("path") String profile, @Param("profileImg") String profileImg);

    String getFileName(@Param("idx") long idx, @Param("path") String profile, @Param("profileImg") String profileImg);
}
