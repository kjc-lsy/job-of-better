package site.dealim.jobconsulting.controller;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.configurationprocessor.json.JSONException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import site.dealim.jobconsulting.mapper.MemberMapper;
import site.dealim.jobconsulting.service.OpenAiService;
import site.dealim.jobconsulting.service.VertexAiService;

import java.io.IOException;

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

}