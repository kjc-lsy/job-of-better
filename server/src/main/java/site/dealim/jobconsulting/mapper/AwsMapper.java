package site.dealim.jobconsulting.mapper;

import org.apache.ibatis.annotations.Mapper;
import site.dealim.jobconsulting.dto.FileDto;

@Mapper
public interface AwsMapper {
    FileDto uploadFile(FileDto fileDto) ;
}
