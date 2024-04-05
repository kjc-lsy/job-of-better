package site.dealim.jobconsulting.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import site.dealim.jobconsulting.domain.ComCoverLetter;
import site.dealim.jobconsulting.domain.Member;
import site.dealim.jobconsulting.security.custom.CustomMember;
import site.dealim.jobconsulting.service.ComCoverLetterService;

import java.util.List;

@RestController
@RequestMapping("/api/company")
@Slf4j
public class ComCoverLetterController {
    @Autowired
    private ComCoverLetterService companyService;
    @PostMapping("/cover-letter-save")
    public ResponseEntity<?> comCoverLetterSave(@AuthenticationPrincipal CustomMember customMember, @RequestBody List<ComCoverLetter> values) {
        Member user = customMember.getMember();
        companyService.comCoverLetterSave(values, user.getComIdx());
        log.info("자소서 항목 등록 성공");
        return new ResponseEntity<>("SUCCESS", HttpStatus.OK);
    }


    @GetMapping("/cover-letter-info")
    public List<ComCoverLetter> comCoverLetterInfo(@AuthenticationPrincipal CustomMember customMember) {
        log.info("자소서 항목 불러오기");
        Member user = customMember.getMember();
        return companyService.comCoverLetterInfo(user.getComIdx());
    }

    @DeleteMapping("/cover-letter-delete/{id}")
    public ResponseEntity<?> comCoverLetterDelete(@AuthenticationPrincipal CustomMember customMember, @PathVariable Long id) {
        Member user = customMember.getMember();
        //System.out.println("cclIdx = " + id);
        companyService.comCoverLetterDelete(id,user);
        log.info("자소서 항목 삭제 성공");
        return new ResponseEntity<>("SUCCESS", HttpStatus.OK);
    }


}