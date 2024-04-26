package site.dealim.jobconsulting.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import site.dealim.jobconsulting.domain.File;

import java.util.List;

@Mapper
public interface FileMapper {
    void upload(File file);

    void deleteFile(@Param("idx") long idx, @Param("path") String profile, @Param("profileImg") String profileImg);

    String getFileName(@Param("idx") long idx, @Param("path") String profile, @Param("profileImg") String profileImg);

    List<File> getFiles(@Param("memIdx") long memIdx, @Param("path") String path);

    void deleteFileByIdx(Long fileIdx);

    String getFileNameByIdx(Long fileIdx);
}
