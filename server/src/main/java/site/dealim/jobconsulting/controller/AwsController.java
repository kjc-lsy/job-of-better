package site.dealim.jobconsulting.controller;

import com.amazonaws.services.s3.model.AmazonS3Exception;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import site.dealim.jobconsulting.service.AwsService;

import java.io.IOException;
import java.util.List;

@RestController
@Log4j2
@Tag(name = "AWS 파일 업로드", description = "AWS Controller")
@RequestMapping("/api/files")
public class AwsController {
    private final AwsService awsService;

    @Autowired
    public AwsController(AwsService awsService) {
        this.awsService = awsService;
    }

    @PostMapping(path = "/upload",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @Operation(summary = "S3 파일 업로드" , description = "multifile list를 s3에 업로드하여 filename list 반환")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "success"),
            @ApiResponse(responseCode = "500", description = "internal server error"),
            @ApiResponse(responseCode = "400", description = "bad request"),
            @ApiResponse(responseCode = "404", description = "not found")
    })
    public ResponseEntity<?> uploadFile(List<MultipartFile> multipartFiles) throws Exception{
        log.info("AWS file Upload");
        List<String> fileNameList = awsService.uploadFile(multipartFiles);
        return ResponseEntity.<String>ok().body(fileNameList);
    }

    @GetMapping("/download/{fileName}")
    public ResponseEntity<Resource> downloadFile(@PathVariable String fileName) throws AmazonS3Exception{
        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .body(new InputStreamResource(awsService.getFile(fileName).getObjectContent()));
    }

}
