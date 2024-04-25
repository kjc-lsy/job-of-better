package site.dealim.jobconsulting.service;

import org.springframework.web.multipart.MultipartFile;
import site.dealim.jobconsulting.domain.File;

import java.util.List;

public interface FileUploadStrategy {
    public List<File> uploadFile(String folder,List<MultipartFile> multipartFiles);

    List<File> uploadFile(Long idx, String cate, String folder, List<MultipartFile> multipartFiles);
}
