package site.dealim.jobconsulting.domain;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class File {
    private Long fileIdx;
    private String originalFileName;
    private String uploadFileName;
    private String uploadFilePath;
    private String uploadFileUrl;
    private LocalDateTime uploadFileDate;
    private Long relatedIdx;
    private String uploadFileExt;
}