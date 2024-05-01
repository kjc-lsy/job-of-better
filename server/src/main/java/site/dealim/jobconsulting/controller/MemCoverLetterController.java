package site.dealim.jobconsulting.controller;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import site.dealim.jobconsulting.domain.Member;
import site.dealim.jobconsulting.domain.MemberCoverLetter;
import site.dealim.jobconsulting.dto.CoverLetterDto;
import site.dealim.jobconsulting.security.custom.CustomMember;
import site.dealim.jobconsulting.service.ComCoverLetterService;
import site.dealim.jobconsulting.service.MemCoverLetterService;
import site.dealim.jobconsulting.service.VertexAiService;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@Tag(name = "회원 - 자기소개서", description = "Member Cover Letter Controller")
@RequestMapping("/api/user")
@Slf4j
public class MemCoverLetterController {
    @Autowired
    private MemCoverLetterService memCoverLetterService;
    @Autowired
    private ComCoverLetterService comCoverLetterService;
    @Autowired
    private VertexAiService vertexAiService;

    @PostMapping("/user-cover-letter-save")
    public ResponseEntity<Map<String, String>> userCoverLetterSave(@AuthenticationPrincipal CustomMember customMember, @RequestBody List<MemberCoverLetter> values) {
        Member user = customMember.getMember();
        memCoverLetterService.userCoverLetterSave(values, user.getIdx());

        Map<String, String> responseMap = new HashMap<>();
        responseMap.put("type", values.get(0).getMclIsConfirm()); // 클라이언트에서 받은 mclIsConfirm 값으로 설정
        responseMap.put("SUCCESS", "SUCCESS"); // 성공 여부 설정

        return new ResponseEntity<>(responseMap, HttpStatus.OK);
    }

    @GetMapping("/user-cover-letter-info")
    public List<CoverLetterDto> userCoverLetterInfo(@AuthenticationPrincipal CustomMember customMember) {
        log.info("자소서 항목 불러오기");
        Member user = customMember.getMember();
        List<CoverLetterDto> coverLetterDtoList = memCoverLetterService.coverLetterInfo(user.getIdx());
        //System.out.println("coverLetterDtoList = " + coverLetterDtoList);
        return memCoverLetterService.coverLetterInfo(user.getIdx(), user.getPgIdx());
    }

    @Secured("ROLE_USER")
    @GetMapping("/user-cover-letter-assessment")
    public String userCoverLetterAssessment(@RequestParam("prompt") String prompt) throws Exception {
        log.info("자소서 항목 vertex ai 평가...");
        return vertexAiService.getAssessment(prompt);
    }


}
