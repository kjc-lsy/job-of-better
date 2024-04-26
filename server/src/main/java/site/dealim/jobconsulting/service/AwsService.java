package site.dealim.jobconsulting.service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.DeleteObjectRequest;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;
import site.dealim.jobconsulting.domain.File;

import java.io.IOException;
import java.io.InputStream;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
@Log4j2
public class AwsService {

private final AmazonS3 amazonS3;

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    public AwsService(AmazonS3 s3Client) {
        this.amazonS3 = s3Client;
    }

    public List<File> uploadFile(String path, List<MultipartFile> multipartFiles){
        log.info("AWS file upload start - folder,multipartFiles");
        List<File> fileList = new ArrayList<>();

        // forEach 구문을 통해 multipartFiles 리스트로 넘어온 파일들을 순차적으로 fileNameList 에 추가
        multipartFiles.forEach(file -> {
            fileList.add(fileBuilder(path , file));
        });
        return fileList;
    }


    public List<File> uploadFile(Long idx, String path, List<MultipartFile> multipartFiles){
        log.info("AWS file upload start -idx,exe,folder,multipartFiles");
        List<File> fileList = new ArrayList<>();

        multipartFiles.forEach(file -> {
            File fileDto = fileBuilder(path , file);
            fileList.add(fileDto.builder()
                    .originalFileName(fileDto.getOriginalFileName())
                    .uploadFileName(fileDto.getUploadFileName())
                    .uploadFileUrl(fileDto.getUploadFileUrl())
                    .uploadFilePath(path)
                    .relatedIdx(idx)
                    .uploadFileExe(getFileExtension(fileDto.getOriginalFileName()).substring(1))
                    .build());
            //System.out.println("fileList = " + fileBuilder(folder, file));
        });
        //System.out.println("fileList = " + fileList);
        return fileList;
    }

    @Transactional
    public File fileBuilder(String path,MultipartFile file) {
        log.info("aws file builder");
        // forEach 구문을 통해 multipartFiles 리스트로 넘어온 파일들을 순차적으로 fileNameList 에 추가
        String originalFileName = file.getOriginalFilename();
        String fileName = path + "/" + createFileName(originalFileName);
        ObjectMetadata objectMetadata = new ObjectMetadata();
        objectMetadata.setContentLength(file.getSize());
        objectMetadata.setContentType(file.getContentType());

        //System.out.println("getFileExtension(originalFileName) = " + getFileExtension(originalFileName));
        
        try(InputStream inputStream = file.getInputStream()){
            amazonS3.putObject(new PutObjectRequest(bucket, fileName, inputStream, objectMetadata)
                    .withCannedAcl(CannedAccessControlList.PublicRead));
        } catch (IOException e){
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "파일 업로드에 실패했습니다.");
        }

        return File.builder()
                .originalFileName(originalFileName)
                .uploadFileName(fileName)
                .uploadFilePath(path)
                .uploadFileUrl(amazonS3.getUrl(bucket, fileName).toString())
                .uploadFileDate(LocalDateTime.now())
                .uploadFileExe(getFileExtension(originalFileName).substring(1))
                .build();
    }

    // 먼저 파일 업로드시, 파일명을 난수화하기 위해 UUID 를 활용하여 난수를 돌린다.
    public String createFileName(String fileName){
        return UUID.randomUUID().toString().concat(getFileExtension(fileName));
    }

    // file 형식이 잘못된 경우를 확인하기 위해 만들어진 로직이며, 파일 타입과 상관없이 업로드할 수 있게 하기위해, "."의 존재 유무만 판단하였습니다.
    private String getFileExtension(String fileName){
        try{
            return fileName.substring(fileName.lastIndexOf("."));
        } catch (StringIndexOutOfBoundsException e){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "잘못된 형식의 파일" + fileName + ") 입니다.");
        }
    }


    public void deleteFile(String fileName){
        amazonS3.deleteObject(new DeleteObjectRequest(bucket, fileName));
        System.out.println(fileName);
    }


    /*public S3Object getFile(String keyName) {
        try {
            UrlResource urlResource = new UrlResource(amazonS3.getUrl(bucket, keyName));
            String contentDisposition = "attachment; filename=\"" +  keyName + "\"";
            String url = amazonS3.getUrl(bucket, keyName).toString();
            return amazonS3.getObject(bucket, keyName);
        } catch (AmazonS3Exception e) {
            log.error(e);
            return null;
        }
    }*/
}
