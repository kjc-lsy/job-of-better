package site.dealim.jobconsulting.controller;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import site.dealim.jobconsulting.domain.ComCoverLetter;
import site.dealim.jobconsulting.domain.Company;
import site.dealim.jobconsulting.domain.Member;
import site.dealim.jobconsulting.dto.CoverLetterDto;
import site.dealim.jobconsulting.security.custom.CustomMember;
import site.dealim.jobconsulting.service.ComCoverLetterService;
import site.dealim.jobconsulting.service.MemCoverLetterService;

import java.util.List;

@RestController
@Tag(name = "기업사용자 - 자기소개서", description = "Company Cover Letter Controller")
@RequestMapping("/api/company")
@Slf4j
public class ComCoverLetterController {
    @Autowired
    private ComCoverLetterService companyService;
    @Autowired
    private MemCoverLetterService memCoverLetterService;
    @PostMapping("/cover-letter-save")
    public ResponseEntity<?> comCoverLetterSave(@RequestBody List<ComCoverLetter> values, @AuthenticationPrincipal CustomMember customMember) {
        companyService.comCoverLetterSave(values, customMember.getMember().getComIdx());
        System.out.println("values = " + values);
        log.info("자소서 항목 등록 성공");
        return new ResponseEntity<>("SUCCESS", HttpStatus.OK);
    }

    @GetMapping("/cover-letter-info")
    public List<ComCoverLetter> comCoverLetterInfo(@RequestParam("pgIdx") Long pgIdx) {
        log.info("자소서 항목 불러오기 - pgIdx = {}", pgIdx);
        return companyService.coverLetterInfo(pgIdx);
        //return companyService.comCoverLetterInfo(user.getComIdx());
    }

    @DeleteMapping("/cover-letter-delete/{id}")
    public ResponseEntity<?> comCoverLetterDelete(@AuthenticationPrincipal CustomMember customMember, @PathVariable Long id) {
        Member user = customMember.getMember();
        //System.out.println("cclIdx = " + id);
        companyService.comCoverLetterDelete(id,user);
        log.info("자소서 항목 삭제 성공");
        return new ResponseEntity<>("SUCCESS", HttpStatus.OK);
    }

    @Secured("ROLE_COMPANY")
    @GetMapping("/user-cover-letter-info")
    public List<CoverLetterDto> userCoverLetterInfo(@RequestParam("memIdx") long memIdx) {
        log.info("학생 자소서 작성 내역 불러오기 - memIdx = {}", memIdx);
        return memCoverLetterService.coverLetterInfo(memIdx);
    }


}