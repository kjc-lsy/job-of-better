package site.dealim.jobconsulting.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.configurationprocessor.json.JSONException;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import site.dealim.jobconsulting.mapper.MemberMapper;
import site.dealim.jobconsulting.security.custom.CustomMember;
import site.dealim.jobconsulting.service.AwsService;
import site.dealim.jobconsulting.service.OpenAiService;
import site.dealim.jobconsulting.service.VertexAiService;

import java.io.IOException;
import java.util.List;

@Slf4j
@RestController
@Tag(name = "Test API")
@RequestMapping("/test")
public class TestController {
    @Autowired
    private OpenAiService openAiService;
    @Autowired
    private VertexAiService vertexAiService;
    @Autowired
    private MemberMapper memberMapper;
    private final AwsService awsService;

    @Autowired
    public TestController(AwsService awsService) {
        this.awsService = awsService;
    }

    @PostMapping("/gpt")
    public ResponseEntity<?> index(@RequestParam(value = "prompt") String prompt) throws Exception {
        return ResponseEntity.ok(openAiService.getSummary(prompt));
    }

    @PostMapping("/vertex-ai")
    public ResponseEntity<?> getSummary(@RequestParam(value = "prompt") String prompt) throws IOException, JSONException {
        return ResponseEntity.ok(vertexAiService.sendMsgOnTextBison(prompt));
    }

    @GetMapping("/member")
    public ResponseEntity<?> test() {
        return ResponseEntity.ok(memberMapper.login("company"));
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
    public ResponseEntity<?> uploadFile(
            CustomMember member,
            @RequestParam("cate") String cate,
            @RequestParam("folder") String folder,
            @RequestParam("file") List<MultipartFile> multipartFiles) throws Exception{
        log.info("AWS file Upload");

        awsService.uploadFile(folder , multipartFiles);
        return ResponseEntity.ok("upload success");
    }
}