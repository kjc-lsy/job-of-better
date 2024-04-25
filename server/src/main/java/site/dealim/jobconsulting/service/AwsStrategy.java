package site.dealim.jobconsulting.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;
import site.dealim.jobconsulting.domain.File;

import java.util.ArrayList;
import java.util.List;

@Component
@Slf4j
public class AwsStrategy implements FileUploadStrategy {
    public final AwsService awsService;
    public AwsStrategy(AwsService awsService){
        this.awsService = awsService;
    }
    @Override
    public List<File> uploadFile(String folder,List<MultipartFile> multipartFiles){
        log.info("AWS file upload start - folder,multipartFiles");
        List<File> fileList = new ArrayList<>();

        // forEach 구문을 통해 multipartFiles 리스트로 넘어온 파일들을 순차적으로 fileNameList 에 추가
        multipartFiles.forEach(file -> {
            fileList.add(awsService.fileBuilder(folder , file));
        });
        return fileList;
    }

    @Override
    public List<File> uploadFile(Long idx ,String cate ,String folder,List<MultipartFile> multipartFiles){
        log.info("AWS file upload start -idx,cate,folder,multipartFiles");
        List<File> fileList = new ArrayList<>();

        multipartFiles.forEach(file ->
                fileList.add(awsService.fileBuilder(folder , file).builder()
                        .relatedIdx(idx)
                        .cate(cate)
                        .build())
        );
        return fileList;
    }
}
