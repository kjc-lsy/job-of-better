package site.dealim.jobconsulting.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import site.dealim.jobconsulting.service.OpenAiService;

@Slf4j
@RestController
@RequestMapping("/test")
public class TestController {
    @Autowired
    private OpenAiService openAiService;

    @PostMapping("/gpt")
    public ResponseEntity<?> index(@RequestParam(value = "prompt") String prompt) throws Exception {

        return ResponseEntity.ok(openAiService.getSummary(prompt));
    }

}