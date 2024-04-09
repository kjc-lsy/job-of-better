package site.dealim.jobconsulting.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.configurationprocessor.json.JSONException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import site.dealim.jobconsulting.service.MemberListService;
import site.dealim.jobconsulting.service.OpenAiService;
import site.dealim.jobconsulting.service.VertexAiService;

import java.io.IOException;

@Slf4j
@RestController
@RequestMapping("/test")
public class TestController {
    @Autowired
    private OpenAiService openAiService;
    @Autowired
    private VertexAiService vertexAiService;
    @Autowired
    private MemberListService memberListService;

    @PostMapping("/gpt")
    public ResponseEntity<?> index(@RequestParam(value = "prompt") String prompt) throws Exception {
        return ResponseEntity.ok(openAiService.getSummary(prompt));
    }

    @PostMapping("/vertex-ai")
    public ResponseEntity<?> getSummary(@RequestParam(value = "prompt") String prompt) throws IOException, JSONException {
        return ResponseEntity.ok(vertexAiService.sendMsgOnTextBison(prompt));
    }

    @GetMapping("/members")
    public ResponseEntity<?> getMembers() {
        return ResponseEntity.ok(memberListService.getMembersList());
    }

}